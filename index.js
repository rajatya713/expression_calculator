let op = document.querySelector(".output-cont")
//InfixToPostfix
let expression = "";
let S = [];
let postfix = "";

const button = document.querySelector(".toggle-dark")
button.addEventListener("click", toggleTheme);

let darkTheme = false;

function toggleTheme(){
    document.querySelector("body").classList.toggle("dark-theme");
    if(darkTheme){
        darkTheme = false;
        button.textContent = "🌚";
    }
    else{
        darkTheme = true;
        button.textContent = "☀️";
    }
}

function calculate(val) {
    if (val === 'C') {
        op.textContent =""
    }
    else {
        op.textContent += val;
    }
}
function back() {
    op.textContent = op.textContent.slice(0, -1);
} 
 
function calculate_total() {
    expression = op.textContent;
    let postfix_value = InfixToPostfix(expression);
   
    let postfix_eval_value = evalPostfix(postfix_value.trim());
    op.textContent = postfix_eval_value;


}
function InfixToPostfix(express) {

    S = [];
    postfix = "";
    for (let i = 0; i < express.length; i++)
    {
        let element = express[i];
        if (element == ' ' || element == ',')
        {
            continue;
        }
        else if (element == '(')
        {

            S.push(element);
            if (postfix.charAt(postfix.length - 1) != ' ' && postfix.length != 0)
            {
                postfix += " ";
            }
        }
        else if (element == ')')
        {
            if (!S.includes('(')) {
                return "error!";
            }
            

            while (!S.length == 0 && S.at(-1) != '(')
            {

                if (postfix.charAt(postfix.length - 1) != ' ')
                {
                    postfix += " ";
                }
                postfix += S.at(-1);
                S.pop();
            }
            S.pop();
        }

        else if (IsOperator(element))
        {
            if (element == '-')
            {
                if (i == 0)
                {
                    postfix += '-';
                    continue;
                }
                else if (express.charAt(i - 1) == '(')
                {
                    if (postfix.charAt(postfix.length - 1) != ' ')
                    {
                        postfix += " ";
                    }
                    postfix += '-';
                    continue;
                }
                

            }
            let cc = true;
            while (S.length != 0 && (S.at(-1) != '(') && HasHigherPrecedence(S.at(-1), element))
            {

                if (postfix.charAt(postfix.length - 1) != ' ')
                {
                    postfix += " ";
                }
                postfix += S.at(-1);
                if (postfix.charAt(postfix.length - 1) != ' ')
                {
                    postfix += " ";
                }
                S.pop();
                cc = false;
            }
            S.push(element);
            if (cc)
            {
                if (postfix.charAt(postfix.length - 1) != ' ')
                {
                    postfix += " ";
                }

            }
        }
        else if (IsOperand(element) || element == '.')
        {

            postfix += element;
        }



    }
    while (S.length != 0)
    {

        postfix += " ";
        postfix += S.at(-1);
        S.pop();
    }
    return postfix;


}
function IsOperand(c)
{
    if (c >= '0' && c <= '9') return true;
    return false;
}
function IsOperator(op)
{

    if (op === '+' || op === '-' || op === '×' || op === '÷')
    {
        return true;
    }
    return false;
}
function GetOperatorWeightage(char)
{

    weight = -1;
    switch (char)
    {
        case '+':
            weight = 1;
            break;
        case '-':
            weight = 1;
            break;
        case '×':
            weight = 2;
            break;
        case '÷':
            weight = 2;
            break;



        default:
            break;
    }
    return weight;

}
function HasHigherPrecedence(op1, op2)
{

    let op1weight = GetOperatorWeightage(op1);
    let op2weight = GetOperatorWeightage(op2);
    return op1weight >= op2weight ? true : false;
}


//Postfix Evaluation:
function eval(lhs, rhs, op)
{
    const p = 1e10;
    switch (op) {

        case '+':
            return ((lhs * p + rhs * p) / p);

        case '-':
            return ((lhs * p - rhs * p) / p);
        case '×':
            return (lhs * p * rhs * p) / (p * p);
        case '÷':
            if (rhs !== 0)
            {
                return lhs / rhs;
            }
            return "Can't Divide by 0";
    }

    return "error!";
}

function evalPostfix(input) {
    let values = [];

    let ss = input.split(' ');

    while (ss.length > 0)
    {
        let token = ss.shift();
        if (!isNaN(parseFloat(token)))
        {
            values.push(parseFloat(token));
        }
        else
        {
            let op = token;
            if (!(op == '+' || op === '-' || op === '×' || op === '÷'))
            {                                         //not a valid operator
                return "error!";
            }

            if (values.length < 2)                 //Not enough values
            {
                return "error!";
            }

            let op2 = values.pop();
            let op1 = values.pop();
            values.push(eval(op1, op2, op));
        }
    }

    if (values.length > 1)
    {                                                 //Not enough operators
        return "error!";
    }

    return values[0];
}

