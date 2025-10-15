import Header from "../components/Header";
import Footer from "../components/Footer";
import Carousel from "../components/Carousel";
import ProductList from "../components/ProductList";
import "../styles/styles.css";

export default function Home() {
  return (
    <div className="d-flex flex-column min-vh-100">

      <main className="flex-grow-1">
        <Carousel />
      </main>

    </div>
  );
}