INSERT INTO users (name, username, password, picture_url) VALUES ('Della', 'Della Kling', '$2a$16$MJ1tzlRgJq.KFVCf4AP.yO7.cZ3.2TvHKZ/4x2C1E1J7P5Oc0j/OC', 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/153.jpg');
INSERT INTO users (name, username, password, picture_url) VALUES ('Harry', 'Harry Runte', '$2a$16$MJ1tzlRgJq.KFVCf4AP.yO7.cZ3.2TvHKZ/4x2C1E1J7P5Oc0j/OC', 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/682.jpg');
INSERT INTO users (name, username, password, picture_url) VALUES ('Maggie', 'Maggie Swaniawski', '$2a$16$MJ1tzlRgJq.KFVCf4AP.yO7.cZ3.2TvHKZ/4x2C1E1J7P5Oc0j/OC', 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/374.jpg');
INSERT INTO users (name, username, password, picture_url) VALUES ('Marcos', 'Marcos Mociski', '$2a$16$MJ1tzlRgJq.KFVCf4AP.yO7.cZ3.2TvHKZ/4x2C1E1J7P5Oc0j/OC', 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/5.jpg');

INSERT INTO tweets (id, body, user_id, created_at) VALUES (0, 'Est deleniti officia est Quis maiores sit quasi natus non blanditiis laudantium ut quasi fugit.', 'Della', '2022-05-08T17:25:27.930Z');
INSERT INTO tweets (id, body, user_id, created_at) VALUES (1, 'A totam excepturi vel natus velit quo impedit enim.', 'Della', '2022-05-09T16:28:27.930Z');
INSERT INTO tweets (id, body, user_id, created_at) VALUES (2, 'Ut soluta expedita vel eius perferendis ut architecto neque ut voluptas corrupti sed nihil perspiciatis 33 fugiat perspiciatis.', 'Marcos', '2022-04-07T08:55:23.930Z');
INSERT INTO tweets (id, body, user_id, created_at) VALUES (3, 'Et esse maiores sit voluptas voluptatem eum aliquid earum ut unde porro ut tempora labore et velit placeat.', 'Harry', '2022-05-01T09:09:09.930Z');

INSERT INTO tweets_comments (id, body, tweet_id, user_id, created_at) VALUES (0, 'Nice', 0, 'Harry', '2022-05-08T18:25:27.930Z');
INSERT INTO tweets_comments (id, body, tweet_id, user_id, created_at) VALUES (1, 'What does this mean?', 3, 'Della', '2022-05-08T18:26:27.930Z');
INSERT INTO tweets_comments (id, body, tweet_id, user_id, created_at) VALUES (2, 'Good question', 3, 'Harry', '2022-05-08T18:27:27.930Z');
