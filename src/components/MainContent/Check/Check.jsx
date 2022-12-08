import React, {useRef, useState} from 'react';

import "primereact/resources/themes/lara-light-blue/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";
import {InputText} from "primereact/inputtext";

import styles from "./Check.module.css"
import {Toast} from "primereact/toast";
import MyButton from "../../UI/button/MyButton";


const Check = (props) => {
    const toastRef = useRef();
    const [action, setAction] = useState(undefined)
    const handleSubmit = (event) => {
        event.preventDefault()
        switch (action) {
            case "check":
                handleSend()
                break
            case "clear":
                props.clearEntries();
                props.clearEntriesForGraph()
                break
        }
    }

    const handleSend = () => {
        let message = undefined


        if (!props.selectedX && props.selectedX!==0) {
            message = "Значение X не выбрано"
        } else if (!props.selectedY) {
            message = "Значение Y не введено"
        } else if (!props.selectedR && props.selectedR!==0) {
            message = "Значение R не выбрано"
        } else {
            if (checkRange()) {
                props.checkEntry();
                if (props.errorMessage) {
                    message = props.errorMessage
                }
                props.setErrorMessage(undefined)
            }
        }
        if (message) {
            toastRef.current.show({severity: "error", summary: "Error", detail: message})
        }
    }

    const checkRange = () => {
        let message = undefined
        if (!props.xValues.filter(v => v === props.selectedX)[0]&& props.selectedX!==0) {

            message ="Значение X не выбрано"

        } else
            if (isNaN(props.selectedY)) {
            message = "Значение Y должно быть числом"
        } else if ((props.selectedY <= -5 || props.selectedY >= 5) && ((props.selectedY.substring(0, 2) !== "4.") && (props.selectedY.substring(0, 3) !== "-4.") && (props.selectedY.substring(0, 2) !== "4,") && (props.selectedY.substring(0, 3) !== "-4,"))) {
            message = "Значение Y не входит в интервал (-5,5)"
        } else if (props.selectedR <= 0) {
            message = "Значение R не больше 0"
        } else if (!props.rValues.filter(v => v === props.selectedR)[0]) {
            message = "Значение R не выбрано"
        }
        if (message) {
            toastRef.current.show({severity: "error", summary: "Error", detail: message})
            return false
        }
        return true
    }

    const setCheckAction = () => {
        setAction("check")
    }

    const setClearAction = () => {
        setAction("clear")
    }


    const changeX = (event) => {
        let xButtons = document.getElementsByName("X")
        for (let xBox of xButtons){
            if (xBox.value !== event.target.value){
                xBox.checked = false
            }
        }
        props.selectX(Number(event.target.value))
    }

    const changeY = (event) => {
        props.selectY(event.target.value.substring(0,8))
    }

    const changeR = (event) => {
        let rButtons = document.getElementsByName("R")
        for (let rBox of rButtons){
            if (rBox.value !== event.target.value){
                rBox.checked = false
            }
        }
        props.selectR(Number(event.target.value))
        props.getEntriesForGraph()

    }

    return (
        <div>
            <Toast ref={toastRef}/>
            <form className={styles.form} onSubmit={handleSubmit}>
                <div>
                    {props.xValues.map((xValue) => {
                        return <label for={"x" + xValue}>{xValue}
                        <input name="X" id={"x" + xValue} type="checkbox" value={xValue} onChange={changeX}/>
                        </label>
                    })}
                </div>
                <br/>
                <div>
                    <InputText
                        placeholder="Y in [-5...5]" name="y" value={props.selectedY} id="y"
                        type="input" onChange={changeY}
                    />
                </div>
                <br/>
                <div>
                    {props.rValues.map((rValue) => {
                        if (rValue<=0) {
                            return <label for={"r" + rValue}>{rValue}
                                <input name="R" id={"r" + rValue} type="checkbox" value={rValue} onChange={changeR} disabled={true}/>
                            </label>
                        } else
                            if(props.selectedR===1&&rValue===1){
                                return <label for={"r" + rValue}>{rValue}
                                    <input name="R" id={"r" + rValue} type="checkbox" value={rValue} checked={true} onChange={changeR}/>
                                </label>}
                        else
                            return <label for={"r" + rValue}>{rValue}
                                <input name="R" id={"r" + rValue} type="checkbox" value={rValue} onChange={changeR}/>
                            </label>
                    })}
                </div>
                <br/>
                <div>
                    <MyButton onClick={setCheckAction}>Отправить</MyButton>
                    <MyButton onClick={setClearAction}>Очистить таблицу</MyButton>
                </div>


            </form>
        </div>

    );
}

export default Check;