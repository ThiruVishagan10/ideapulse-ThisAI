# AI Analyzer API Documentation

## Overview
The AI Analyzer API provides comprehensive idea analysis with different goal-oriented approaches. The system supports four analysis types: Startup, Academic, Research, and Refinement.

## Analysis Goals

### 1. Startup
- **Focus**: Business viability and market analysis
- **Output**: Market research, competitor analysis, revenue models, feasibility metrics

### 2. Academic  
- **Focus**: Research methodology and scholarly approach
- **Output**: Literature review, research questions, methodology framework, academic validation

### 3. Research
- **Focus**: Scientific investigation and hypothesis testing
- **Output**: Hypothesis formation, experimental design, data analysis framework, research roadmap

### 4. Refinement
- **Focus**: Improve and optimize existing concepts
- **Output**: Gap analysis, optimization strategies, enhancement recommendations, iteration roadmap

## API Endpoints

### 1. Start Full Analysis
```
POST /api/analyzer/run-full
```

**Request Body:**
```json
{
  "idea_id": "550e8400-e29b-41d4-a716-446655440000",
  "idea_title": "Smart Solar Energy Management System",
  "idea_body": "A comprehensive renewable energy solution that combines advanced solar panels with AI-powered optimization to maximize energy efficiency and reduce costs for residential and commercial users.", 
  "tags": ["renewable", "ai", "energy", "solar", "optimization"],
  "goal": "startup",
  "user_id": "123e4567-e89b-12d3-a456-426614174000"
}
```

**Response:**
```json
{
  "success": true,
  "job_id": "6ba7b810-9dad-11d1-80b4-00c04fd430c8",
  "message": "Analysis started successfully"
}
```

### 2. Get Analysis Progress
```
GET /api/analyzer/job/6ba7b810-9dad-11d1-80b4-00c04fd430c8/status
```

**Response:**
```json
{
  "status": "running",
  "progress": {
    "problem": "completed",
    "solution": "completed",
    "audience": "running",
    "features": "pending",
    "personas": "pending",
    "use_cases": "pending",
    "feasibility": "pending",
    "swot": "pending",
    "monetization": "pending",
    "roadmap": "pending"
  }
}
```

### 3. Get Analysis Results
```
GET /api/analyzer/job/6ba7b810-9dad-11d1-80b4-00c04fd430c8/result
```

**Response:**
```json
{
  "success": true,
  "result": {
    "problem": {
      "problem_statement": "Current energy systems are inefficient and costly, with limited renewable integration and poor optimization capabilities leading to high electricity bills and environmental concerns."
    },
    "solution": {
      "solution_approach": "AI-powered solar energy management system with predictive analytics, automated optimization, and smart grid integration to maximize efficiency and reduce costs."
    },
    "audience": {
      "target_segments": ["Residential homeowners", "Commercial businesses", "Government entities", "Environmental organizations"]
    },
    "features": {
      "features": [
        {
          "name": "Smart Solar Panels",
          "description": "High-efficiency panels with IoT sensors for real-time monitoring and performance optimization"
        },
        {
          "name": "AI Optimization Engine",
          "description": "Machine learning algorithms for energy production forecasting and consumption optimization"
        },
        {
          "name": "Grid Integration",
          "description": "Seamless connection to smart grids for energy trading and load balancing"
        }
      ]
    },
    "personas": {
      "personas": [
        {
          "name": "Sarah Johnson",
          "role": "Homeowner",
          "demographics": {
            "age_range": "35-45",
            "location": "Suburban California",
            "income": "$75,000-$100,000"
          },
          "pain_points": ["High electricity bills", "Environmental concerns", "Energy reliability issues"],
          "goals": ["Reduce energy costs", "Go green", "Energy independence"],
          "behaviors": ["Tech-savvy", "Research-oriented", "Cost-conscious"],
          "tech_comfort": "High"
        },
        {
          "name": "Michael Chen",
          "role": "Business Owner",
          "demographics": {
            "age_range": "40-55",
            "location": "Urban Texas",
            "income": "$150,000+"
          },
          "pain_points": ["Rising operational costs", "Corporate sustainability pressure", "Energy budget unpredictability"],
          "goals": ["Reduce operational expenses", "Improve brand image", "Meet sustainability targets"],
          "behaviors": ["ROI-focused", "Strategic planner", "Innovation adopter"],
          "tech_comfort": "Medium-High"
        }
      ]
    },
    "use_cases": {
      "use_cases": [
        {
          "title": "Residential Energy Management",
          "description": "Automated home energy optimization with grid integration and battery storage management"
        },
        {
          "title": "Commercial Energy Optimization",
          "description": "Large-scale energy management for businesses with demand forecasting and cost optimization"
        },
        {
          "title": "Community Microgrids",
          "description": "Neighborhood-level energy sharing and optimization for improved resilience"
        }
      ]
    },
    "feasibility": {
      "technical_score": "High",
      "market_score": "Medium-High", 
      "financial_score": "Medium"
    },
    "swot": {
      "strengths": ["Advanced AI technology", "Growing market demand", "Government incentives", "Environmental benefits"],
      "weaknesses": ["High initial investment", "Complex installation", "Weather dependency", "Technology complexity"],
      "opportunities": ["Climate change awareness", "Decreasing solar costs", "Smart city initiatives", "Energy storage advances"],
      "threats": ["Market competition", "Regulatory changes", "Economic downturns", "Technology disruption"]
    },
    "monetization": {
      "revenue_streams": [
        "Direct hardware sales",
        "Subscription-based monitoring service",
        "Energy trading platform fees",
        "Installation and maintenance services",
        "Data analytics licensing"
      ]
    },
    "roadmap": {
      "phases": [
        {
          "phase": "Phase 1: MVP Development",
          "duration": "6 months",
          "timeline": "Q1-Q2 2024",
          "milestones": ["Prototype completion", "Initial testing", "Patent filing"],
          "deliverables": ["Working prototype", "Test results", "Technical documentation"],
          "resources_needed": ["Development team", "Testing equipment", "$500K funding"]
        },
        {
          "phase": "Phase 2: Pilot Deployment",
          "duration": "4 months",
          "timeline": "Q3-Q4 2024",
          "milestones": ["Pilot installations", "User feedback", "Performance validation"],
          "deliverables": ["Pilot results", "User testimonials", "Refined product"],
          "resources_needed": ["Installation team", "Customer support", "$300K funding"]
        },
        {
          "phase": "Phase 3: Market Launch",
          "duration": "6 months",
          "timeline": "Q1-Q2 2025",
          "milestones": ["Product launch", "Marketing campaign", "Sales targets"],
          "deliverables": ["Commercial product", "Marketing materials", "Sales pipeline"],
          "resources_needed": ["Marketing team", "Sales force", "$1M funding"]
        }
      ]
    }
  }
}
```

### 4. Get Saved Analysis Results
```
GET /api/analyzer/results/{idea_id}
```

**Response:**
```json
{
  "success": true,
  "results": {
    // Same structure as job result
  }
}
```

### 5. Run Single Section
```
POST /api/analyzer/run-section
```

**Request Body:**
```json
{
  "idea_id": "550e8400-e29b-41d4-a716-446655440000",
  "section": "personas",
  "payload": {},
  "user_id": "123e4567-e89b-12d3-a456-426614174000"
}
```

### 6. Save Analysis Snapshot
```
POST /api/analyzer/snapshot
```

**Request Body:**
```json
{
  "idea_id": "550e8400-e29b-41d4-a716-446655440000",
  "analysis_data": {
    "problem": {
      "problem_statement": "Current energy systems are inefficient..."
    },
    "solution": {
      "solution_approach": "AI-powered solar energy management..."
    }
  },
  "user_id": "123e4567-e89b-12d3-a456-426614174000"
}
```

## Analysis Layers

### Foundation Layer
- Problem identification
- Solution approach  
- Target audience
- Key features
- User personas
- Use cases

### Intelligence Layer  
- Feasibility analysis
- SWOT analysis
- Risk assessment
- Monetization strategies
- Technical architecture
- Development roadmap

### Specialist Layer
- Competitor analysis
- System diagrams
- Data flow diagrams
- Technical specifications

## Error Responses

```json
{
  "success": false,
  "error": "Error message",
  "code": "ERROR_CODE"
}
```

## Status Codes
- `200` - Success
- `400` - Bad Request
- `404` - Not Found
- `500` - Internal Server Error