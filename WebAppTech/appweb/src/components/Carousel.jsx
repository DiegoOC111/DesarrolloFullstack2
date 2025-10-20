import React from "react";

export default function Carousel() {
  return (
    <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
      <ol className="carousel-indicators">
        <li data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active"></li>
        <li data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1"></li>
        <li data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2"></li>
      </ol>

      <div className="carousel-inner">
        <div className="carousel-item active">
          <a href="/productos">
            <img
              className="d-block w-100 carousel-img"
              src="https://good-game.cl/modules/labslideshow/images/54c7463c2151ded2f8b942059d286ee4fbf74c8b_ofertas%2018-01.jpg"
              alt="Ofertas gamer"
            />
          </a>
        </div>
        <div className="carousel-item">
          <a href="/productos">
            <img
              className="d-block w-100 carousel-img"
              src="https://www.diarioestrategia.cl/images/showid/6722903"
              alt="Rog Ally x"
            />
          </a>
        </div>
        <div className="carousel-item">
          <a href="/productos">
            <img
              className="d-block w-100 carousel-img"
              src="https://www.gameshub.com/wp-content/uploads/sites/5/2023/07/rog-strix-scar-16-2023-g634.jpg"
              alt="Asus rog strix"
            />
          </a>
        </div>
      </div>

      <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>

      <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
}
