// Interface for User Details
export interface UserDetails {
    name: string;
    _id: string;
  }
  
  // Interface for Author
export interface Author {
    _id: string;
    userDetails: UserDetails;
  }
  
  // Interface for Reply
export interface Reply {
    reply: string;
    author: Author;
    _id: string;
    createdAt: string;
    updatedAt: string;
  }
  
  // Interface for the Main Object
export interface Discussion {
    _id: string;
    title: string;
    description: string;
    author: Author;
    tags: string[];
    replies: Reply[];
    createdAt: string;
    updatedAt: string;
  }