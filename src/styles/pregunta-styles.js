import { css } from "lit";

export default css`
:host{
    color: white;
    font-family: Arial, Helvetica, sans-serif;
    letter-spacing: 0.5px;
}

div{
    text-align: left;
    margin: 2rem 3rem;
}

div.actions{  
 margin: 0;
}

div.actions>*{
    margin: 0.5rem 0.5rem;
    padding: 0.2rem 0.4rem;
}

.iniciar{
    margin:0rem 2rem;
}

.open{
    display:none
}

.correcta{
    color:rgb(14 253 14);
}

.incorrecta{
    color:red;
}
`