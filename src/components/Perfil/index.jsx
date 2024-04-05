import { useState, useEffect } from "react";
import styles from './Perfil.module.css';

const Perfil = ({ nomeUsuario }) => {
    const [usuario, setUsuario] = useState(null);
    const [erro, setErro] = useState(null);

    useEffect(() => {
        if (nomeUsuario.trim() !== '') {
            fetch(`https://api.github.com/users/${nomeUsuario}`)
                .then(res => {
                    if (res.ok) {
                        return res.json();
                    } else {
                        throw new Error('Usuário não encontrado.');
                    }
                })
                .then(resJson => {
                    setUsuario(resJson);
                })
                .catch(error => {
                    setErro(error.message);
                });
        }
    }, [nomeUsuario]);

    if (erro) {
        return null; // Se ocorrer um erro, não renderiza nada
    }

    return (
        <div className={styles.header}>
            {usuario && (
                <>
                    <img className={styles.avatar} src={usuario.avatar_url} alt="Avatar do usuário" />
                    <h2 className={styles.name}>{usuario.name}</h2>
                </>
            )}
        </div>
    );
};

export default Perfil;
