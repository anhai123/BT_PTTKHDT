import { Card } from "antd";
const { Meta } = Card;
const MovieCarouselItem = () => (
  <Card
    hoverable
    style={{
      width: "21%",
      display: "inline-block",
      margin: "2%",
    }}
    cover={
      <img
        alt="example"
        src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
      />
    }
  >
    <Meta title="Europe Street beat" description="www.instagram.com" />
  </Card>
);
export default MovieCarouselItem;
