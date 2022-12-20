import React, {useEffect, useState, useSelector} from 'react'
import { Container, Grow, Grid, Paper, AppBar, TextField, Button } from '@material-ui/core'
import { useHistory, useLocation } from 'react-router-dom'
import { useDispatch } from "react-redux"
import ChipInput from "material-ui-chip-input"

import {getPosts, getPostsBySearch} from "../../actions/posts"
import useStyles from "../styles"
import Pagination from "../paginations"
import Posts from "../Posts/Posts"
import Form from "../Form/Form"

function useQurey() {
  return new URLSearchParams(useLocation().search)
}

const Home = () => {
    const [currentId, setCurrentId] = useState(null)
    const classes = useStyles()
    const dispatch = useDispatch()
    const query = useQurey()
    const history = useHistory()
    const page = query.get("page") || 1
    const searchQuery = query.get("searchQuery")
    const [search, setSearch] = useState("")
    const [tags, setTags] = useState([])
    
    const searchPost = () => {
      if(search.trim() || tags) {
        dispatch(getPostsBySearch({ search, tags: tags.join(',')}))
        history.push(`/posts/search?searchQuery${search || "none"}&tags=${tags.join(",")}`)
      } else {
        history.push("/")
      }
    }

    const onKeyPress = (e) => {
      if (e.keyCode === 13) {
        searchPost()
      }
    }

    const handleAdd = (tag) => setTags([...tags, tag])

    const handleDelete = (tagToDelete) => setTags(tags.filter((tag) => tag !== tagToDelete))
    
  return (
    <Grow in>
        <Container maxWidth="xl">
            <Grid className={classes.gridContainer} container justifyContent="space-between" alignItems="stretch" spacing={3}>
                <Grid item xs={12} sm={6} md={9}>
                  <Posts setCurrentId={setCurrentId} currentId={currentId} />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                <AppBar className={classes.appBarSearch} position="static" color="inherit">
                  <TextField name="search" variant="outlined" label="Search Memories" onKeyPress={onKeyPress} fullWidth value={search} onChange={(e)=>{setSearch(e.target.value)}} />
                  <ChipInput styles={{margin: "10px 0"}} value={tags} onAdd={handleAdd} onDelete={handleDelete} label="Search Tags" variant='outlined'/>
                  <Button onClick={searchPost} className={classes.searchButton} variant="contained" color="primary">Search</Button>
                </AppBar>
                <Form currentId={currentId} setCurrentId={setCurrentId} />
                {(!searchQuery && !tags.length) && (
                  <Paper className={classes.Pagination} elevation={6}>
                    <Pagination page={page} />
                  </Paper>
                )}
                </Grid>
            </Grid>
        </Container>
    </Grow>
  )
}

export default Home