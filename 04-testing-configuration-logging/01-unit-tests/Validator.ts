interface Rule {
  type: 'string' | 'number';
  min: number;
  max: number;
}

interface Error<T extends keyof any> {
  field: T;
  error: string;
}

export default class Validator <T extends Record<string, Rule>>{
  rules: T;

  constructor(rules: T) {
    this.rules = rules;
  }

  validate(obj: Record<keyof T, any>) {
    const errors: Error<keyof T>[] = [];

    for (const field of Object.keys(this.rules)) {
      const rules = this.rules[field];

      const value = obj[field];
      const type = typeof value;

      if (type !== rules.type) {
        errors.push({ field, error: `expect ${rules.type}, got ${type}` });
        return errors;
      }

      switch (type) {
        case 'string':
          {
            if (value.length < rules.min) {
              errors.push({
                field,
                error: `too short, expect ${rules.min}, got ${value.length}`,
              });
            }
  
            if (value.length > rules.max) {
              errors.push({
                field,
                error: `too long, expect ${rules.max}, got ${value.length}`,
              });
            }
            
            break;
          }
        case 'number':
          {
            if (value < rules.min) {
              errors.push({
                field,
                error: `too little, expect ${rules.min}, got ${value}`,
              });
            }
  
            if (value > rules.max) {
              errors.push({
                field,
                error: `too big, expect ${rules.max}, got ${value}`,
              });
            }
            
            break;
          }
      }
    }

    return errors;
  }
}
