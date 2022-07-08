import { OPERATORS } from '../../src/js/constants';

const { divide, multiple, minus, plus, equal } = OPERATORS;

const numberClassName = '.digit';
const operatorClassName = '.operation';

const totalDisplay = () => cy.get('#total').invoke('text');

const clickNumber = (number) =>
  cy.get(numberClassName).contains(String(number)).click();

const clickOperator = (operator) =>
  cy.get(operatorClassName).contains(operator).click();

const clickReset = () => cy.get('.modifier').click();

const getTotalResult = (number) => {
  cy.get('#total').invoke('text').should('eq', String(number));
};

describe('계산기 테스트', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5500/');
  });

  it('계산기의 Display 초기값은 0이다.', () => {
    cy.get('#total').invoke('text').should('eq', '0');
  });

  it('2개의 숫자에 대해 덧셈이 가능하다.', () => {
    clickNumber(1);
    clickOperator(plus);
    clickNumber(3);
    clickOperator(equal);
    getTotalResult(4);
  });

  it('2개의 숫자에 대해 뺄셈이 가능하다.', () => {
    clickNumber(2);
    clickOperator(minus);
    clickNumber(4);
    clickOperator(equal);
    getTotalResult(-2);
  });

  it('2개의 숫자에 대해 곱셈이 가능하다.', () => {
    clickNumber(7);
    clickOperator(multiple);
    clickNumber(9);
    clickOperator(equal);
    getTotalResult(63);
  });

  it('2개의 숫자에 대해 나눗셈이 가능하다.', () => {
    clickNumber(9);
    clickOperator(divide);
    clickNumber(3);
    clickOperator(equal);
    getTotalResult(3);
  });

  it('AC(All Clear)버튼을 누르면 0으로 초기화 한다.', () => {
    clickNumber(9);
    clickOperator(divide);
    clickNumber(6);
    clickOperator(equal);
    totalDisplay().should('eq', String(1));
    clickReset();
    getTotalResult(0);
  });

  it('숫자는 한번에 최대 3자리 수까지 입력 가능하다.', () => {
    clickNumber(9);
    clickNumber(9);
    clickNumber(9);
    clickNumber(9);
    cy.on('window:alert', (text) => {
      expect(text).to.contain('숫자는 세 자리까지만 입력 가능합니다!');
    });
    totalDisplay().should('have.length', 3);
  });

  it('계산 결과를 표현할 때 소수점 이하는 버림한다.', () => {
    clickNumber(9);
    clickOperator(divide);
    clickNumber(6);
    clickOperator(equal);
    getTotalResult(1);
  });
});
