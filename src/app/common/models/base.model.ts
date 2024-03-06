import { Course } from "./course.model";

export abstract class BaseModel<T> {
    public data?: {
      sections: { content?: T[] | undefined; } | undefined;
      content?: T[] | T;
    };
    public pageable?: {
      offset?: number;
      pageNumber?: number;
      pageSize?: number;
    }
    public status?: number;
  
    constructor(model?: Partial<T>) {
      if (model) {
        Object.assign(this, model);
      }
    }
  
    public toJson(): any {
      return JSON.parse(JSON.stringify(this));
    }
  }