import "./ItemCard.css";
import like from "../../images/likebtn.png";

function ItemCard({ item, onCardClick }) {
  const handleCardPreview = () => {
    onCardClick(item);
  };

  return (
    <li className="card">
      <div className="card__container">
        <h2 className="card__name">{item.name}</h2>
        <img src={like} alt="" className="card__like" />
      </div>
      <img
        onClick={handleCardPreview}
        src={item.link}
        alt={item.name}
        className="card__image"
      />
    </li>
  );
}

export default ItemCard;
