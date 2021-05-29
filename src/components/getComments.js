  
import React, { Component } from "react";
import axios from 'axios';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import '../components/styles/material.css';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';



const makeStyles = theme => ({
    menuButton: {
        marginRight: theme.spacing(2),
    },
    image: {
        width: '100%'
    },
    padding: {
        padding: 20
    },
    margin: {
        marginTop: '4%'
    }
})


export default withStyles(makeStyles)(class GetComments extends Component {

    state = {
        data: [],
        open: false,
        Message: '',
        tag: []

    }


    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.state.Message)
        this.handleClickClose();
    }
    preventDefault = event => event.preventDefault();
    handleClickOpen = () => {
        this.setState({
            open: true
        })
    };
    handleClickClose = () => {
        this.setState({
            open: false
        })
    };
    componentDidMount() {
        const { match: { params } } = this.props
        axios.get(`https://jsonplaceholder.typicode.com/posts/${params.id}/comments`).then(res => {
            this.setState({ data: res.data });
        });
    }
    iterateTags = (Tags) => {
        console.log(Tags)
        return (
            Tags.map((eachTags, index) => {
                return <Button size="small" key={index} color="primary">
                    {eachTags}
                </Button>

            })
        )
    }
    handleText = (Message) => ({ target: { value } }) => {
        console.log(value)
        this.setState({
            Message: value
        })
        console.log(this.state.form)
    }

    iteratePostData = (data) => {
        console.log(data)
        const { classes } = this.props
        return (
            data.map((eachData, index) => {
                return (
                    <div key={index} className={classes.image}>
                        <Grid item xs={12}>
                            <div className={classes.padding}  >
                                <Card className={classes.card}>
                                    <CardHeader
                                        avatar={
                                            <Avatar aria-label="recipe" className={classes.avatar}>
                                                <img alt="" src={eachData.owner.image} className={classes.image} />
                                            </Avatar>
                                        }

                                        title={eachData.owner.firstName}

                                    />
                                    <CardMedia
                                        className={classes.media}
                                        image={eachData.image}
                                        title="Paella dish"
                                    />
                                    <CardContent>
                                        <Typography variant="body2" color="textSecondary" component="p">
                                            {eachData.message}
                                        </Typography>
                                    </CardContent>

                                    <CardContent>
                                        {this.iterateTags(eachData.tags)}
                                    </CardContent>
                                </Card>
                            </div>
                        </Grid>


                    </div>
                )
            })
        )
    }


    render() {
        const { classes } = this.props
        return (

            <div>
                <Dialog
                    title="Dialog With Custom Width"
                    modal={true}
                    open={this.state.open}
                >
                    <form>
                        <div>
                            This dialog spans the entire width of the screen.
                        <TextField
                                id="filled-multiline-static"
                                label="Message"
                                multiline
                                rows="4"
                                placeholder=" post message"
                                margin="normal"
                                variant="filled"
                                className="input-width"
                                value={this.state.Message}
                                onChange={this.handleText('Message')}
                            />
                            {/* <Chip
                                key={data.key}
                                icon={icon}
                                label={data.label}
                                onDelete={this.handleDelete(data)}
                                className="input-width"
                            /> */}
                            <Button color="inherit" onClick={this.handleClickClose}>Createpost</Button>
                            <Button onClick={this.handleSubmit} color="inherit">post</Button>

                        </div>

                    </form>
                </Dialog>
                <div>
                    <AppBar position="static">
                        <Toolbar>
                            <IconButton edge="start" color="inherit" aria-label="menu">
                            </IconButton>
                            <Typography variant="h6" >
                                Posts
                            </Typography>
                            <Button color="inherit" onClick={this.handleClickOpen}>Createpost</Button>
                        </Toolbar>


                    </AppBar>

                </div>
                <div>
                    <div>
                        <Grid container direction="column"
                            alignItems="center"
                            justify="center" spacing={1}>
                            <Grid container className={classes.margin} item xs={12} lg={6} spacing={3}>
                                {this.iteratePostData(this.state.data)}
                            </Grid>
                        </Grid>
                    </div>
                </div>
            </div>

        )
    }
})

