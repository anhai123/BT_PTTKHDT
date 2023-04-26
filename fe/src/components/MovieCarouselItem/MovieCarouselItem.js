import { Card } from "antd";
const { Meta } = Card;
const MovieCarouselItem = (props) => (
  <Card
    hoverable
    style={{
      width: "100%",
    }}
    cover={
      <img
        style={{ height: "70%" }}
        alt="example"
        src={props.film.poster_ulr}
      />
    }
  >
    <Meta title={props.film.title} description={props.film.genre} />
  </Card>
);
export default MovieCarouselItem;
