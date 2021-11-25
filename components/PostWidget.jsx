import React, { useState, useEffect } from "react";
import Image from "next/image";
import moment from "moment";
import Link from "next/link";

import { graphCMSImageLoader } from "../util";
import { getSimilarPosts, getRecentPosts } from "../services";

const PostWidget = ({ categories, slug }) => {
  const [relatedPosts, setRelatedPosts] = useState([]);

  useEffect(() => {
    if (slug) {
      getSimilarPosts(categories, slug).then((result) =>
        setRelatedPosts(result)
      );
    } else {
      getRecentPosts().then((result) => setRelatedPosts(result));
    }
  }, [slug]);

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">
      <h3 className="text-lg mb-8 font-semibold border-double pb-4">
        {slug ? "Related Posts" : "Similar Posts"}
      </h3>
      {relatedPosts.map((post, index) => (
        <div key={index} className="flex items-center w-full mb-4">
          <div className="flex-none w-16">
            <Image
              loader={graphCMSImageLoader}
              alt={post.title}
              height="60px"
              width="60px"
              unoptimized
              className="align-middle rounded-full"
              src={post.featuredImage.url}
            />
          </div>
          <div className="flex-grow ml4">
            <p className="text-gray-500 text-xs">
              {moment(post.createdAt).format("MMM DD,YYYY")}
            </p>
            <Link href={`/post/${post.slug}`}>{post.title}</Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostWidget;
