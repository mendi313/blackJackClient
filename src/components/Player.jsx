export default function Dealer({ cardsProps, sum, title }) {
  return (
    <div className="dealer-cards">
      <h2>
        {title}: {sum}
      </h2>
      {cardsProps?.map((card) => {
        return (
          <img
            className="cards-img"
            key={card.src}
            src={
              card.hidden
                ? '/cards-img/BACK.png'
                : `/cards-img/${card.src}.png`
            }
            alt=""
          />
        );
      })}
    </div>
  );
}
