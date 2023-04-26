import { Avatar, Divider, List, Skeleton } from "antd";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Button, Space, message } from "antd";
import userService from "../../services/user.service";
import "./ShowTime.scss";
import BookingTicket from "../BookingTicket";
const ShowtimeMovie = (props) => {
  // console.log(props.filmRender);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [screeningID, setScreeningId] = useState("");
  // const [infoDatVe, setInfoDatVe] = useState({
  //   screenId: {},
  //   room: [],
  //   seat: [],
  // });
  const setScreenId = (screenId) => {
    setScreeningId(screenId);
  };
  useEffect(() => {
    console.log(screeningID);
    if (screeningID !== "") {
      userService.getSeat(screeningID).then(
        (response) => {
          // setUserInfo(response);
          // setIslog(true);
          // state.userAPI.isLogged.setIsLogged(true);

          message.success("Tìm ghế thành công");
          props.setInfoDatVe(response);
          console.log(response);
        },
        (error) => {
          const _content =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          console.log(_content);
          message.error(_content);
        }
      );
    }
  }, [screeningID]);
  const loadMoreData = () => {
    if (loading) {
      return;
    }
    setLoading(true);
    fetch(
      "https://randomuser.me/api/?results=10&inc=name,gender,email,nat,picture&noinfo"
    )
      .then((res) => res.json())
      .then((body) => {
        setData([...data, ...body.results]);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    loadMoreData();
  }, []);

  return (
    <div
      id="scrollableDiv"
      style={{
        height: 400,
        overflow: "auto",
        padding: "0 16px",
        border: "1px solid rgba(140, 140, 140, 0.35)",
        width: "600px",
        background: "white",
      }}
    >
      <InfiniteScroll
        dataLength={props.filmRender.length}
        next={loadMoreData}
        hasMore={false}
        loader={
          <Skeleton
            avatar
            paragraph={{
              rows: 1,
            }}
            active
          />
        }
        endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
        scrollableTarget="scrollableDiv"
      >
        <List
          dataSource={props.filmRender}
          renderItem={(item) => {
            if (item.screenings.length > 0) {
              return (
                <List.Item key={item.movie_id}>
                  <List.Item.Meta
                    avatar={
                      <Avatar
                        shape="square"
                        size="large"
                        src={item.poster_ulr}
                      />
                    }
                    title={
                      <p>
                        {item.title} - {item.duration} phút{" "}
                      </p>
                    }
                    description={
                      <InfiniteScroll
                        dataLength={item.screenings.length}
                        hasMore={false}
                        loader={
                          <Skeleton
                            avatar
                            paragraph={{
                              rows: 1,
                            }}
                            active
                          />
                        }
                        endMessage={<Divider plain> 🤐🤐🤐🤐🤐🤐🤐</Divider>}
                        scrollableTarget="scrollableDiv"
                      >
                        <List
                          dataSource={item.screenings}
                          renderItem={(item) => (
                            <List.Item
                              key={item.screening_id}
                              style={{ display: "inline-flex" }}
                            >
                              <List.Item.Meta
                              // description={

                              // }
                              />
                              <Button
                                type="text"
                                onClick={() => {
                                  setScreenId(item.screening_id);
                                }}
                                style={{
                                  borderColor: "rgb(26 186 248)",
                                  color: "#32da32",
                                  display: "inline-block",
                                }}
                              >
                                {item.start_time}
                              </Button>
                            </List.Item>
                          )}
                        />
                      </InfiniteScroll>
                    }
                  />
                </List.Item>
              );
            }
          }}
        />
      </InfiniteScroll>
    </div>
  );
};
export default ShowtimeMovie;
