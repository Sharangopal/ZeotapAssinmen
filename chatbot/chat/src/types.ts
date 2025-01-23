export interface Message {
    id: string;
    content: string;
    sender: 'user' | 'bot';
    timestamp: Date;
  }
  
  export interface CDP {
    name: string;
    description: string;
    documentation: string;
  }
  
  export const CDPs: CDP[] = [
    {
      name: 'Segment',
      description: 'Customer Data Infrastructure platform',
      documentation: 'https://segment.com/docs/'
    },
    {
      name: 'mParticle',
      description: 'Customer Data Platform for enterprise brands',
      documentation: 'https://docs.mparticle.com/'
    },
    {
      name: 'Lytics',
      description: 'Customer Data Platform with ML capabilities',
      documentation: 'https://learn.lytics.com/'
    },
    {
      name: 'Zeotap',
      description: 'Unified Data & Identity Platform',
      documentation: 'https://docs.zeotap.com/'
    }
  ];