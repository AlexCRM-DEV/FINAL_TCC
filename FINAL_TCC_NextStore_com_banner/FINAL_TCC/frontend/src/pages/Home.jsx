import { useEffect, useState } from "react";
import imagem from "../assets/imagemilus.png";
import "./Home.css";

function Home() {
    const [produtos, setProdutos] = useState([]);
    const [carregando, setCarregando] = useState(true);
    useEffect(() => {
        buscarProdutos();
    }, []);
    async function buscarProdutos() {
        try {
            const resposta = await fetch(
                "http://localhost:3001/produtos"
            );
            const dados = await resposta.json();
            setProdutos(dados);
        } catch (error) {
            console.error(
                "Erro ao buscar produtos:",
                error
            );
        } finally {
            setCarregando(false);
        }
    }
    return (
        <div className="home">
            <img
                src={imagem}
                alt="NextStore"
                className="imagemtelainteira"
            />
            <section className="home-beneficios">
                <div className="home-container">
                    <div className="beneficios-grid">
                        <div className="beneficio">
                            <div className="beneficio-icone">
                                →
                            </div>
                            <h3>
                                Velocidade de entrega
                            </h3>
                            <p>
                                Entregamos seus produtos com
                                segurança e agilidade.
                            </p>
                        </div>
                        <div className="beneficio">
                            <div className="beneficio-icone">
                                ✓
                            </div>
                            <h3>
                                Compre com segurança
                            </h3>
                            <p>
                                Segurança de seus dados durante
                                toda a compra.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
export default Home;