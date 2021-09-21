import Validator from '../Validator';
import { expect } from 'chai';

describe('testing-configuration-logging/unit-tests', () => {
  describe('Validator', () => {
    it('валидатор проверяет строковое поле на min', () => {
      const validator = new Validator({
        name: {
          type: 'string',
          min: 10,
          max: 20,
        },
      });

      const errors = validator.validate({ name: 'Lalala' });

      expect(errors).to.have.length(1);
      expect(errors[0]).to.have.property('field').and.to.be.equal('name');
      expect(errors[0])
        .to.have.property('error')
        .and.to.be.equal('too short, expect 10, got 6');
    });

    it('валидатор проверяет строковое поле на max', () => {
      const validator = new Validator({
        name: {
          type: 'string',
          min: 1,
          max: 2,
        },
      });

      const errors = validator.validate({ name: 'qwert' });

      expect(errors).to.have.length(1);
      expect(errors[0]).to.have.property('field').and.to.be.equal('name');
      expect(errors[0])
        .to.have.property('error')
        .and.to.be.equal('too long, expect 2, got 5');
    });

    it('валидатор проверяет соответствие типов', () => {
      const validator = new Validator({
        name: {
          type: 'string',
          min: 10,
          max: 20,
        },
      });

      const errors = validator.validate({ name: 1 });

      expect(errors).to.have.length(1);
      expect(errors[0]).to.have.property('field').and.to.be.equal('name');
      expect(errors[0])
        .to.have.property('error')
        .and.to.be.equal('expect string, got number');
    });

    it('валидатор проверяет числовое поле на min', () => {
      const validator = new Validator({
        name: {
          type: 'number',
          min: 10,
          max: 20,
        },
      });

      const errors = validator.validate({ name: 1 });

      expect(errors).to.have.length(1);
      expect(errors[0]).to.have.property('field').and.to.be.equal('name');
      expect(errors[0])
        .to.have.property('error')
        .and.to.be.equal('too little, expect 10, got 1');
    });

    it('валидатор проверяет числовое поле на max', () => {
      const validator = new Validator({
        name: {
          type: 'number',
          min: 10,
          max: 20,
        },
      });

      const errors = validator.validate({ name: 21 });

      expect(errors).to.have.length(1);
      expect(errors[0]).to.have.property('field').and.to.be.equal('name');
      expect(errors[0])
        .to.have.property('error')
        .and.to.be.equal('too big, expect 20, got 21');
    });

    it('валидатор проверяет числовое и строковое поле на max', () => {
      const validator = new Validator({
        name: {
          type: 'number',
          min: 10,
          max: 20,
        },
        age: {
          type: 'number',
          min: 1,
          max: 2,
        },
      });

      const errors = validator.validate({ name: 21, age: 3 });

      expect(errors).to.have.length(2);

      expect(errors[0]).to.have.property('field').and.to.be.equal('name');
      expect(errors[0])
        .to.have.property('error')
        .and.to.be.equal('too big, expect 20, got 21');

      expect(errors[1]).to.have.property('field').and.to.be.equal('age');
      expect(errors[1])
        .to.have.property('error')
        .and.to.be.equal('too big, expect 2, got 3');
    });
  });
});
