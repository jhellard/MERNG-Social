import { useQuery } from "@apollo/client";
import React from "react";
import {
  Grid,
  Image,
  Header,
  Button,
  Icon,
  Label,
  Card,
} from "semantic-ui-react";

import MyPopup from "../util/MyPopup";
import PostCard from "../components/PostCard";

import { FETCH_POSTS_QUERY } from "../util/graphql";

const UserPage = (props) => {
  const user = props.match.params.username;

  const { loading, data: { getPosts: posts } = {} } = useQuery(
    FETCH_POSTS_QUERY
  );

  return (
    <Grid>
      <Grid.Row>
        <Grid.Column width={4}>
          <Header as="h1" style={{ textAlign: "center" }}>
            {user}
          </Header>
          <Image
            circular
            src="https://react.semantic-ui.com/images/avatar/large/molly.png"
            size="medium"
            float="right"
          />
          <Card.Content style={{ display: "flex", justifyContent: "center" }}>
            <MyPopup content={`Like ${user}'s page`}>
              <Button
                labelPosition="right"
                float="middle"
                style={{ marginTop: 10 }}
              >
                <Button color="blue" basic>
                  <Icon name="star" />
                </Button>
                <Label
                  basic
                  color="blue"
                  pointing="left"
                  style={{ height: 36 }}
                >
                  placeholder
                </Label>
              </Button>
            </MyPopup>
          </Card.Content>
        </Grid.Column>
        <Grid.Column width={8}>
          {loading ? (
            <p>Loading posts...</p>
          ) : (
            posts &&
            posts.map(
              (post) =>
                user === post.username && <PostCard post={post} key={post.id} />
            )
          )}
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default UserPage;
