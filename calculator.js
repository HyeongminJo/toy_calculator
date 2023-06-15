class calculator{
    //class 선언
    constructor(displayElement){
    //생성자 함수 통해 displayElement의 초기 상태를 지정하기 위한 책상정리
        this.displayElement = displayElement
        //this는 인스턴스 자신을 가리키는 참조변수
        // calculator 클래스의 안에 있는 인스턴스 변수 displayElement에 displayElement를 담음
        this.displayContent = '' //문자형
        // calculator 클래스 안에 있는 인스턴스 변수 displayContent에 빈 문자열을 담음
        this.clear()
    }
    
    appendNumber(number){
    //appendNumber 메서드 추가
        this.displayContent += number
        //+=는 this.displayContent = this.displayContent + number 와 같은 뜻
        //문자열에 + 기호를 쓴 경우 덧셈을 하는게 아니라 문자열을 이음
    }
    
    appendOperator(operator){
        this.displayContent += operator
        //this.displayContent = this.displayContent + operator 의 의미
    }

    updateDisplay(){
    // updateDisplay 메서드 추가
        this.displayElement.value = this.displayContent
        //this.displayElement의 값(value)에 this.displayContent를 담는다
    }
    
    clear(){
        this.displayContent = ''
        this.displayElement.value = 0
    }

    compute(){
        this.displayContent = eval(this.displayContent
        // eval()은 문자로 표현된 js 코드 실행하는 함수

            .replace('\u00D7','*')
            .replace('\u00F7','/')
            //\u00D7은 x, \u00F7은 + 의미
            // +와 -는 잘 되지만 x과 /는 에러 발생
            // 곱하기와 나누기 *와 /를 사용하기 위해 replace 사용
        )
    }
}

const buttons = document.querySelectorAll('button')
const displayElement = document.querySelector('input')

const Calculator = new calculator(displayElement)
// calculator 객체 생성. 객체 안에 displayElement, displayContent가 세팅되어 있음

buttons.forEach(button => {
//arrow 함수 forEach문 : 리스트.forEach(원소=>함수(원소));
// 리스트 내의 각 원소를 함수안에 차례로 넣음
// 클릭한 버튼이 연산자면 calculator 클래스의 appendOperator 메서드 추가
    button.addEventListener('click', () => {
    //대상객체.addEventListener('이벤트명', fuction 함수명(event){})=('이벤트 만들기') 
    // : 특정 이벤트 발생 시 특정 함수 실행하는 기능
    // () => 는 function 키워드 대신 화살표 사용해 간략히 함수선언 (매개변수 없는 경우) 
    // 모든 버튼에 클릭 이벤트를 연결하고 switch문으로 data-type에 따라 버튼 구분하기
        switch (button.dataset.type){
            case 'operator':
                Calculator.appendOperator(button.innerText)
                Calculator.updateDisplay()
                break
            case 'ac' :
            // ac 버튼 누르면 모든 입력이 초기화되도록 클래스의 clear 메서드 추가 후 ac 버튼과 연결
                Calculator.clear()
                break
            case 'equals' :
                Calculator.compute()
                Calculator.updateDisplay()
                break
            default :
                Calculator.appendNumber(button.innerText)
                Calculator.updateDisplay()
                break
        }
        //data-type은 html코드에서 요소별로 부여 
        // button.dataset.type 부분은 button의 데이터타입을 가져옴 
        // 케이스별로 분류하여 'operator', 'ac', 'equals'와 비교하여 일치여부 판단하고 콘솔 로그에 표시
    })
})