import { useContext } from "react";
import { DadosContext } from "../context/DadosContext";
import { RotatingLines } from 'react-loader-spinner'

export default function LoadingDelete() {
    const { visible } = useContext(DadosContext);

    return (
            <RotatingLines
                strokeColor="grey"
                strokeWidth="5"
                animationDuration="0.75"
                width="100"
                visible={visible}
            />
    )
}