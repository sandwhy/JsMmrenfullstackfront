import React from 'react'
import Post from "./Post/Post"
import { Grid, CircularProgress } from "@material-ui/core"
import {useSelector} from "react-redux"

import useStyles from "./styles"

const Posts = ({setCurrentId, currentId}) => {
    const {posts, isLoading} = useSelector((state) => state.posts)

    // console.log("here are the posts")
    // console.log(posts)
    const classes = useStyles()
    
    if (!posts.length && !isLoading) return "No Posts"

  return (
    !posts?.length ? <CircularProgress /> : (
      <Grid className={classes.container} container alignItems="stretch" spacing={3}>
        {posts.map((post) => (
          <Grid item key={post._id} xs={12} sm={6} lg={3}>
            <Post post={post} setCurrentId={setCurrentId} currentId={currentId} />
          </Grid>
        ))}
      </Grid>
    )
  )
}

export default Posts