import { CDPs } from '../types';

// Helper function to check if question is about comparison
function isComparisonQuestion(q: string): boolean {
  const comparisonKeywords = ['compare', 'difference', 'versus', 'vs', 'better'];
  return comparisonKeywords.some(keyword => q.includes(keyword));
}

// Helper function to identify advanced technical questions
function isAdvancedQuestion(q: string): boolean {
  const advancedKeywords = ['custom', 'advanced', 'complex', 'enterprise', 'scale', 'optimize', 'troubleshoot'];
  return advancedKeywords.some(keyword => q.includes(keyword));
}

export function generateResponse(question: string): string {
  const q = question.toLowerCase();
  
  // Check if question is CDP related
  const isCDPRelated = CDPs.some(cdp => 
    q.includes(cdp.name.toLowerCase()) || 
    q.includes('cdp') ||
    q.includes('customer data')
  );

  if (!isCDPRelated) {
    return "I can only help with questions related to Customer Data Platforms (CDPs) like Segment, mParticle, Lytics, and Zeotap. Please ask me how to perform specific tasks in these platforms.";
  }

  // Handle CDP comparisons
  if (isComparisonQuestion(q)) {
    if (q.includes('audience') || q.includes('segment')) {
      return `Audience Creation Comparison Across CDPs

Segment:
- Uses Computed Traits and SQL-based segments
- Real-time audience updates
- Direct integration with advertising platforms
- Supports lookalike audiences

mParticle:
- Rule-based audience builder
- Advanced audience splitting
- Supports real-time and batch processing
- Cross-device audience unification

Lytics:
- Uses proprietary Lytics Query Language (LQL)
- AI-powered predictive audiences
- Behavioral scoring built-in
- Content affinity modeling

Zeotap:
- Deterministic and probabilistic matching
- Pre-built audience templates
- Custom audience rules
- Multi-channel activation

Key Differences:
1. Audience Creation:
   - Segment: SQL-based, technical approach
   - mParticle: Rule-based, user-friendly interface
   - Lytics: AI-driven with custom query language
   - Zeotap: Template-based with customization

2. Update Frequency:
   - Segment: Real-time
   - mParticle: Real-time + Batch
   - Lytics: Real-time + Scheduled
   - Zeotap: Configurable intervals

3. Unique Features:
   - Segment: SQL flexibility
   - mParticle: Cross-device capabilities
   - Lytics: AI predictions
   - Zeotap: Pre-built templates

For detailed documentation on each platform:
- Segment: ${CDPs[0].documentation}
- mParticle: ${CDPs[1].documentation}
- Lytics: ${CDPs[2].documentation}
- Zeotap: ${CDPs[3].documentation}`;
    }
  }

  // Handle advanced technical questions
  if (isAdvancedQuestion(q)) {
    if (q.includes('segment')) {
      return `Advanced Segment Implementation Guide

1. Custom Source Implementation
   \`\`\`javascript
   const Analytics = require('@segment/analytics-node');
   const analytics = new Analytics({ writeKey: 'YOUR_WRITE_KEY' });
   
   // Custom middleware for event enrichment
   analytics.addSourceMiddleware(({ payload, next }) => {
     payload.obj.context = {
       ...payload.obj.context,
       environment: process.env.NODE_ENV,
       version: process.env.APP_VERSION
     };
     next(payload);
   });
   \`\`\`

2. Advanced Event Tracking
   \`\`\`javascript
   // Batch event processing
   const events = users.map(user => ({
     userId: user.id,
     event: 'User Scored',
     properties: {
       score: calculateScore(user),
       segments: user.segments,
       lastActivity: user.lastSeen
     }
   }));
   
   await analytics.track(events);
   \`\`\`

3. Error Handling and Retry Logic
   \`\`\`javascript
   class SegmentQueue {
     async retryWithBackoff(event, attempt = 1) {
       try {
         await analytics.track(event);
       } catch (error) {
         if (attempt <= 3) {
           await new Promise(r => setTimeout(r, Math.pow(2, attempt) * 1000));
           return this.retryWithBackoff(event, attempt + 1);
         }
         throw error;
       }
     }
   }
   \`\`\`

4. Custom Integrations
   - Implement OAuth2 flow
   - Handle rate limiting
   - Manage API quotas
   - Monitor performance

For detailed implementation guides, visit: ${CDPs[0].documentation}`;
    }
  }

  if (q.includes('segment')) {
    if (q.includes('source') || q.includes('set up')) {
      return `Setting up a Source in Segment

Overview:
A Source is where your customer data originates. Segment supports various source types including websites, mobile apps, servers, and cloud applications.

Prerequisites:
- A Segment workspace
- Write key access
- Source-specific requirements (e.g., website URL, API credentials)

Step-by-Step Instructions:

1. Create a Source
   - Go to Segment's web app
   - Click "Add Source" from the Sources page
   - Search for your source type in the catalog
   - Click "Add Source" next to your selection

2. Configure Your Source
   - Name your source
   - For JavaScript sources:
     • Copy the Segment snippet
     • Add it to your website's <head> tag
     • Initialize analytics with your write key
   - For server-side sources:
     • Install the library (e.g., npm install @segment/analytics-node)
     • Initialize with your write key
     • Start tracking events

3. Implement Tracking
   - Track key user actions:
     • identify(): For user traits
     • track(): For events
     • page(): For page views
     • group(): For account/organization data
   Example:
   \`\`\`javascript
   analytics.track('Order Completed', {
     order_id: '5678',
     total: 99.99,
     currency: 'USD'
   });
   \`\`\`

4. Verify Implementation
   - Use the Segment debugger
   - Check live events in the Segment UI
   - Verify data quality in the Schema tab

Best Practices:
- Follow the Analytics.js 2.0 spec
- Use consistent event naming
- Include relevant properties
- Test in development before production

For complete documentation and implementation details, visit: ${CDPs[0].documentation}`;
    }
  }

  if (q.includes('mparticle')) {
    if (q.includes('profile') || q.includes('user')) {
      return `Identity Sync in mParticle

Overview:
Identity Sync helps you create a unified customer view by connecting user identities across different platforms and touchpoints.

Prerequisites:
- mParticle account
- Identity strategy defined
- Data sources configured

Step-by-Step Instructions:

1. Set Up Identity Strategy
   - Define Identity Types:
     • Customer ID (MPID)
     • Email
     • Device ID
     • Push Token
     • Partner IDs
   - Configure Identity Priority:
     • Set hierarchy for identity resolution
     • Define rules for identity matches

2. Implement Identity API
   - Use Identity API calls:
     • Identify: Link user identities
     • Login: Associate temporary to permanent ID
     • Logout: Clear temporary identities
     • Modify: Update identity information
   Example:
   \`\`\`javascript
   const identityRequest = {
     userIdentities: {
       customerid: '123456',
       email: 'user@example.com'
     }
   };
   mParticle.Identity.login(identityRequest);
   \`\`\`

3. Configure Identity Rules
   - Set Up Matching Rules:
     • Exact Match
     • Probabilistic Match
     • Custom Rules
   - Define Identity Resolution:
     • Profile Merge Rules
     • Cross-Device Matching
     • Identity Hierarchies

4. Monitor and Maintain
   - Use Identity Dashboard:
     • View Identity Maps
     • Monitor Match Rates
     • Track Identity Changes
   - Audit Identity Data:
     • Check Data Quality
     • Review Match Accuracy
     • Monitor Error Rates

Best Practices:
- Use persistent identifiers
- Implement proper error handling
- Regular monitoring of match rates
- Keep identity hierarchies simple

For detailed implementation guides and API references, visit: ${CDPs[1].documentation}`;
    }
  }

  if (q.includes('lytics')) {
    if (q.includes('audience') || q.includes('segment')) {
      return `Building Audiences in Lytics

• Overview
  - Purpose: Target users based on behaviors, attributes, and predictive scores
  - Platform: Lytics segmentation engine
  - Key capability: Advanced audience targeting

• Prerequisites
  - Lytics account access
  - Data collection implemented
  - Understanding of LQL (Lytics Query Language)

• Step 1: Create an Audience
  - Navigate to Audiences section
  - Click "Create Audience" button
  - Select audience type:
    ∙ Standard Audience
    ∙ Look-alike Audience
    ∙ Predictive Audience

• Step 2: Define Audience Rules
  - Configure Entity Filters:
    ∙ User attributes
    ∙ Content affinity
    ∙ Behavioral data
  - Example LQL Query:
    \`\`\`sql
    // Users who viewed product pages in last 7 days
    FILTER user_table WHERE
      event = "page_view" AND
      content.type = "product" AND
      ts > now() - "7d"
    \`\`\`

• Step 3: Advanced Settings
  - Update Frequency Options:
    ∙ Real-time
    ∙ Hourly
    ∙ Daily
  - Behavioral Scoring:
    ∙ Engagement scores
    ∙ Content affinity
    ∙ Purchase probability

• Step 4: Testing & Activation
  - Preview Audience Size
  - Review Sample Profiles
  - Enable Real-time Updates
  - Connect to Destinations

• Best Practices
  - Start with broad criteria
  - Use behavioral indicators
  - Combine multiple signals
  - Maintain regular audience updates

For complete documentation: ${CDPs[2].documentation}`;
    }
  }

  if (q.includes('zeotap')) {
    if (q.includes('integrate') || q.includes('data')) {
      return `Data Integration with Zeotap

Overview:
Zeotap's Customer Intelligence Platform (CIP) enables you to unify and activate your customer data across multiple channels.

Prerequisites:
- Zeotap account
- Data source access
- Integration credentials
- Data mapping plan

Step-by-Step Instructions:

1. Set Up Data Source
   - Access Zeotap CIP
   - Go to "Integrations"
   - Choose Integration Type:
     • File Upload
     • API Integration
     • Partner Connect
     • Custom Source

2. Configure Data Mapping
   - Map Standard Fields:
     • Customer IDs
     • Contact Information
     • Demographics
     • Custom Attributes
   - Set Up Transformations:
     • Data Formatting
     • Field Mapping
     • Value Standardization

3. Implement Integration
   - For API Integration:
     \`\`\`javascript
     // Example API call
     const response = await fetch('https://api.zeotap.com/v2/users', {
       method: 'POST',
       headers: {
         'Authorization': 'Bearer YOUR_API_KEY',
         'Content-Type': 'application/json'
       },
       body: JSON.stringify({
         user_id: '123',
         attributes: {
           email: 'user@example.com',
           country: 'US'
         }
       })
     });
     \`\`\`

4. Validate and Monitor
   - Check Data Quality:
     • Field Validation
     • Data Completeness
     • Error Handling
   - Monitor Integration:
     • Success Rates
     • Error Logs
     • Data Volumes

Best Practices:
- Use consistent identifiers
- Implement error handling
- Monitor data quality
- Regular validation checks

For detailed integration guides and API documentation, visit: ${CDPs[3].documentation}`;
    }
  }

  return `I understand you're asking about ${
    CDPs.find(cdp => q.includes(cdp.name.toLowerCase()))?.name || 'CDPs'
  }. Could you please be more specific about what you'd like to know? You can ask me about:

- Setting up data sources and integrations
- Creating and managing user profiles
- Building audience segments
- Implementing tracking and analytics
- Data privacy and security settings
- Real-time data synchronization
- Custom integrations and workflows
- Comparing features between CDPs
- Advanced technical implementations`;
}