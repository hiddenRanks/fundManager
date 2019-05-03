class App {
    //생성자 (메소드 생성) / let app = new App(받을 값);
    constructor() {
        this.fundList = [];
        this.fundCnt = 1; //현재 펀드번호

        //private list nav = document.querySelectorAll
        this.nav = document.querySelectorAll("nav a");

        this.nav.forEach(x => {
            x.addEventListener("click", this.changeMenu.bind(this)); //bind: 묶어주다.
        });

        this.articleList = document.querySelectorAll("article");
        
        this.loadingMethod = {
            "list": this.loadingList.bind(this),
            "register": this.loadingRegister.bind(this),
            "investor": this.loadingInvestor.bind(this)
        }

        document.querySelector("#register button").addEventListener("click", this.registerFund.bind(this));
    }

    changeMenu(e) {
        e.preventDefault(); //a태그의 기본적인 이벤트를 없에준다. / 자주 씀
        let target = e.target.dataset.target;

        //메뉴 클릭시 나오는 메인
        this.articleList.forEach(x => x.classList.remove("active"));
        document.querySelector("#" + target).classList.add("active");

        //메뉴바
        this.nav.forEach(x => x.classList.remove("active"));
        e.target.classList.add("active");

        this.loadingMethod[target]();
    }

    //펀드 등록 페이지
    loadingRegister() {
        let no = "00000" + this.fundCnt;
        no = no.substring(no.length - 5);

        document.querySelector("#fundNo").value = no;
        document.querySelector("#fundName").value = "";
        document.querySelector("#endDate").value = "";
        document.querySelector("#total").value = "";
    }

    //펀드 등록하는 로직
    registerFund() {
        let no = document.querySelector("#fundNo").value;
        let name = document.querySelector("#fundName").value;
        let endDate = document.querySelector("#endDate").value;
        let total = document.querySelector("#total").value;

        if(name == "" || endDate == "" || total == "") {
            this.showMsg("값이 없거나 잘못된 형식 입니다.");
            return;
        }

        let fund = new Fund(no, name, endDate, total);
        this.fundList.push(fund);
        this.showMsg("등록 되었습니다.");
        this.fundCnt++;
        this.nav[0].click(); //등록후 이동됨
    }

    //펀드 리스트 페이지
    loadingList() {
        console.log("리스트 페이지");
    }

    //투자자 보는 페이지
    loadingInvestor() {
        console.log("투자자 페이지");
    }

    showMsg(msg) {
        alert(msg);
    }
}

//html의 코드를 다 읽었을 때
window.onload = function() {
    //변경될 일이 없다면 let대신 const를 써준다.
    const app = new App();
}