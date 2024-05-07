# Sazim take home challenege documentation

As the description of the challenge points out aptly that there are 3 parts to implement: Front end (fe), Back end (be) and Database (db).

The first thing I decided to tackle is the be and db. Why? Because getting these done would make things many times easier to handle in the fe.

Since be and db is very unfamiliar to me, I expected this to be the most challenging part of this project.

After setting up the server, db and prisma. With a basic user model, its time to attempt part 1: the login and user registration (sign up). Challenging parts of this section is to figure out how to communicate back and forth with the front end to simulate authentication.

## Completed functionality for Part 1

This was very challenging for me as the syntax of express and prisma was not very familiar to me.
Mantine initially felt a bit slow due to syntax unfamiliarity but it feels easy to work with.
Experienced some weird errors with cors which was resolved by enabling the CORS policy in my express server.

## Starting Part 2

Faced a lot of trouble with the getMyProducts and addProduct api methods due to unfamiliarity with the syntax. Struggled a lot while using postman and was scratching my head as to why the post method wasn't working. Turns out I was sending the request in raw text format and not json.

Both fe and be completed for part 2 and that was very challenging for me. Mostly due to lack of experience. Working in fe mostly, built good habits for debugging in front end however, lack of experience in backend got me scrambled in the most minor of issues. Picked up a few pointers for debugging such as console.logging with checkpoints in multiple lines to check which command was causing the error. Encountered a lot of weird errors. An example would be I was sending userId params as strings but the database was expecting integers. That took way too long for me to figure out.

Putting a lid on part 2 for now. It's at least functional. Will come back to it later when working on fe to streamline it further.

## Starting Part 3

Completed buyProduct be and database funcitonality. Seems to work thus far. More will be revealed when we get to fe. Will now work on rentProduct backend functionality.

Addition of the buyProduct function resulted in the delete product button not working in MyProducts page. That was likely because after the transaction, the product sold was still being displayed. So implemented the logic in MyProducts get function such that those products with the status of sold do not get displayed. I did not delete the productId from the user table altogether as it might be useful to keep a transaction history.

Preliminary implementation of rentProduct functionality. Now moving to fe to see how it works. Will, for sure, have to come back to it later to refine it or change it.

Backend funtionality more or less working with one exception. How rental period will be handled? I was planning on separating the transaction table into two, one for buy/sell and one for rented/lent. I am not sure how to handle this, I will keep it in one table for now for simplicity.

My frequency of git commits greatly decreased and this is due to the fact that its hard to exacly distinguish if a task is completed, you start doing one thing then in the process of debugging are completely changing another thing. I will try to be a bit more organized and more frequent in my commits.

Struggling with authentication. Currently I am doing something weird with localstorage and I am unsure if its the best way. ChatGPT recommended use of JSON Web tokens and react router so tomorrow I will work on that.
Also need to streamline the api endpoints but they are working fine thus far so I'd rather not create problems ahead of experiencing them.

## Summary

Working on this project was a great experience from start to finish. All the problems I faced boils down to my lack of experience and exposure to the technologies. But loved working with these new technologies, it was a great learning experience. This has also inspired me to not limit myself to the frontend technologies, although important, but branching out is necessary. I also understood that why concepts such as reusability is so important. Things get confusing very fast as the codebase grows. I intend to imporve on these good developer habits as well.
Last note, a big thank you to those who designed this project. It was a good balance of challenging and helpful. You pushed my limits but you also guided me as much as necessary so its not overwhelming.
All in all, great experience. Thank you for this opportunity.
