import { useState, useEffect } from "react"

const Formulario = () => {
    const [materiaA, setMateriaA] = useState(0);
    const [materiaB, setMateriaB] = useState(0);
    const [materiaC, setMateriaC] = useState(0);
    const [nome, setNome] = useState('');

    useEffect(() => {
        console.log("O componente iniciou.");

        return () => {
            console.log("O componente finalizou.");
        }
    }, []);

    useEffect(() => {
        console.log("O estado nome mudou.");
    }, [nome]);

    useEffect(() => {
        console.log("O estado MateriaA mudou." + materiaA);
    }, [materiaA, materiaB, materiaC]);

    const alteraNome = (evento) => {
        // setNome(evento.target.value);
        setNome(estadoAnterior => {
        
            return evento.target.value;
        })
    }

    const renderizaResultado = () => {
        const soma = materiaA + materiaB + materiaC;
        const media = soma / 3;

        if (media >= 7) {
            return (
                <p> {nome} está aprovado!</p>
            )
        } else {
            return (
            <p>{nome} está reprovado!</p>
            )
        }
    }

    return (
        <form>
            <ul>
            {[1, 2, 3, 4, 5].map(item => (
             <li key={item}>{item}</li>   
            ))}
            </ul>

            <input type="text" placeholder="Nome do aluno" onChange={alteraNome} />
            <input type="number" placeholder="Nota da matéria A" onChange={({target}) => setMateriaA(parseInt(target.value))} />
            <input type="number" placeholder="Nota da matéria B" onChange={evento => setMateriaB(parseInt(evento.target.value))} />
            <input type="number" placeholder="Nota da matéria C" onChange={evento => setMateriaC(parseInt(evento.target.value))} />
            {renderizaResultado()}
        </form>
    )
}

export default Formulario