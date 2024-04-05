import { useEffect, useState } from "react";
import styles from './ReposList.module.css';

const ReposList = ({ nomeUsuario }) => {
    const [repos, setRepos] = useState([]);
    const [estaCarregando, setEstaCarregando] = useState(true);
    const [erro, setErro] = useState(null);

    useEffect(() => {
        setEstaCarregando(true);
        setErro(null); // Limpa o erro ao começar uma nova requisição
        if (nomeUsuario.trim() !== '') { // Verifica se o nome de usuário não está vazio
            fetch(`https://api.github.com/users/${nomeUsuario}/repos`)
                .then(res => {
                    if (!res.ok) { // Verifica se a resposta da requisição é bem-sucedida
                        throw new Error('Usuário não encontrado.'); // Lança um erro personalizado
                    }
                    return res.json();
                })
                .then(resJson => {
                    setTimeout(() => {
                        setEstaCarregando(false);
                        setRepos(resJson);
                    }, 2000);
                })
                .catch(error => {
                    setEstaCarregando(false);
                    setErro(error.message); // Define a mensagem de erro para exibição
                });
        } else {
            setEstaCarregando(false);
        }
    }, [nomeUsuario]);

    return (
        <div className="repos-list-container">
            {erro && <h1>{erro}</h1>}
            {!erro && (
                <>
                    {estaCarregando ? (
                        <h1>Carregando...</h1>
                    ) : (
                        <ul className={styles.list}>
                            {repos.map(({ id, name, language, html_url }) => (
                                <li className={styles.listItem} key={id}>
                                    <div className={styles.itemName}>
                                        <b>Nome:</b>
                                        {name}
                                    </div>
                                    <div className={styles.itemLanguage}>
                                        <b>Linguagem:</b>
                                        {language}
                                    </div>
                                    <a className={styles.itemLink} target="_blank" href={html_url}>Visitar no GitHub</a>
                                </li>
                            ))}
                        </ul>
                    )}
                </>
            )}
        </div>
    );
};

export default ReposList;
