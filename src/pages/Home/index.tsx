import React from "react";
import Header from "../../components/Header";
import { Background } from "./styles";
import Footer from "../../components/Footer";

const Home: React.FC = () => {
    return <>
        <Header/>
        <Background />
        <Footer />
    </>
};

export default Home;
