interface AnalyzerClient {
  startAnalysis: (ideaData: any) => Promise<string>;
  pollProgress: (jobId: string, onProgress: (status: any) => void) => Promise<any>;
  getResults: (jobId: string) => Promise<any>;
  saveSnapshot: (ideaId: string, analysisData: any, userId: string) => Promise<any>;
}

export class AnalyzerAPIClient implements AnalyzerClient {
  private baseUrl: string;

  constructor(baseUrl: string = '/api/analyzer') {
    this.baseUrl = baseUrl;
  }

  async startAnalysis(ideaData: any): Promise<string> {
    const response = await fetch(`${this.baseUrl}/run-full`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        idea_id: ideaData.id,
        idea_title: ideaData.title,
        idea_body: ideaData.body,
        tags: ideaData.tags || [],
        goal: ideaData.goal || 'startup',
        user_id: ideaData.userId
      })
    });
    
    if (!response.ok) {
      throw new Error('Failed to start analysis');
    }
    
    const result = await response.json();
    return result.job_id;
  }

  async pollProgress(jobId: string, onProgress: (status: any) => void): Promise<any> {
    const poll = async (): Promise<any> => {
      try {
        const response = await fetch(`${this.baseUrl}/job/${jobId}/status`);
        if (!response.ok) {
          throw new Error('Failed to get status');
        }
        
        const status = await response.json();
        onProgress(status);
        
        if (status.status === 'completed') {
          const results = await this.getResults(jobId);
          return results;
        } else if (status.status === 'failed') {
          throw new Error('Analysis failed');
        } else {
          await new Promise(resolve => setTimeout(resolve, 2000));
          return poll();
        }
      } catch (error) {
        console.error('Polling error:', error);
        await new Promise(resolve => setTimeout(resolve, 5000));
        return poll();
      }
    };
    
    return poll();
  }

  async getResults(jobId: string): Promise<any> {
    const response = await fetch(`${this.baseUrl}/job/${jobId}/result`);
    if (!response.ok) {
      throw new Error('Failed to get results');
    }
    return response.json();
  }

  async saveSnapshot(ideaId: string, analysisData: any, userId: string): Promise<any> {
    const response = await fetch(`${this.baseUrl}/snapshot`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        idea_id: ideaId,
        analysis_data: analysisData,
        user_id: userId
      })
    });
    
    if (!response.ok) {
      throw new Error('Failed to save snapshot');
    }
    
    return response.json();
  }
}

export const analyzerClient = new AnalyzerAPIClient();