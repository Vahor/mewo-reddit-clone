import React, {useEffect, useState} from "react";
import {FeedResponse} from "../interface/api";
import {getFeed} from "../api/api";
import FeedPost from "./Post";

const Feed = () => {

    const [feed, setFeed] = useState<FeedResponse>()

    useEffect(() => {
        getFeed().then((feed) => {
            setFeed(feed)
        })
    }, []);

    return (
        <div className='container mx-auto'>
            {feed === undefined && <div>loading</div>}
            <div className="flex flex-col gap-3">
                {feed?.map(post => <FeedPost post={post} key={post.id}/>)}
            </div>

        </div>
    )
}


export default Feed;
