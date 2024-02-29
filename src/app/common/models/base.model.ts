export abstract class BaseModel<T> {
    public data?: {
      sections: { content?: import("c:/Users/pushpalatha.s/Desktop/web learning/law-learning-web/src/app/common/models/course.model").Course | import("c:/Users/pushpalatha.s/Desktop/web learning/law-learning-web/src/app/common/models/course.model").Course[] | undefined; } | undefined;
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