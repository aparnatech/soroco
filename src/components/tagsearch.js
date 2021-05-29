import React, { Component } from "react";
import axios from 'axios';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';

const makeStyles = theme => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    card: {
        maxWidth: 345,
    },
    media: {
        height: 140,
    },
    padding: {
        padding: 20
    },
    margin: {
        marginTop: '4%'
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,

        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    },
    searchIcon: {
        width: theme.spacing(7),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 7),
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: 120,
            '&:focus': {
                width: 200,
            },
        },
    },
    link: {
        margin: theme.spacing(1),
        color: '#eeffff',
        float: 'right'
    },
})
export default withStyles(makeStyles)(class TagSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        };

    };
    componentDidMount() {
        axios.get('https://n161.tech/api/dummyapi/post').then(res => {
            this.setState({ data: res.data.data });
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
    iterateUserPost = (data) => {
        console.log(data)
        const { classes } = this.props
        return (
            data.map((eachData, index) => {
                return (

                    <div className="" key={index}>

                        <Grid item xs={12}>
                            <div className={classes.padding}>
                                <Card className={classes.card}>
                                    <CardActionArea>
                                        <CardMedia
                                            className={classes.media}
                                            image={eachData.image}
                                            title="Contemplative Reptile"
                                        />
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="h2">
                                                {eachData.owner.firstName}  {eachData.owner.lasttName}
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary" component="p">
                                                {eachData.message}
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                    <CardActions>

                                        <span>{this.iterateTags(eachData.tags)}</span>
                                    </CardActions>
                                </Card>
                            </div>

                        </Grid>



                    </div >
                )
            })
        )
    }

    onchange = e => {
        if (e.target.value) {
            axios.get(`https://n161.tech/api/dummyapi/tag/${e.target.value}/post`).then(res => {
                if (res) {
                    this.setState({ data: res.data.data });
                }
            });
        }
        else {
            this.componentDidMount()
        }
    }

    render() {
        const { classes } = this.props
        return (
            <div>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton edge="start" color="inherit" aria-label="menu">
                        </IconButton>
                        <Typography variant="h6" >
                            Posts
                            </Typography>

                        <InputBase
                            placeholder="Search by tag…"
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            name='search'
                            onChange={this.onchange}
                            inputProps={{ 'aria-label': 'search' }}
                        />
                        <Link href="/users" onClick={this.preventDefault} className={classes.link}>
                            Users
  </Link>
                    </Toolbar>

                </AppBar>

                <Grid container spacing={1}>
                    <Grid container className={classes.margin} item xs={12} spacing={3}>
                        {this.iterateUserPost(this.state.data)}
                    </ Grid>
                </Grid>
            </div>
        )

    }
}
)