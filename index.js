import express from 'express'
import { Sequelize, DataTypes } from 'sequelize';
import { MainRouter } from './routes/main.router.js';
import { sync } from './routes/sync.js';
import { UserRouter } from './routes/user.router.js';
import { CategoryRouter } from './routes/category.router.js';
import { ProductRouter } from './routes/product.router.js';

import { ProductCategoryRouter } from './routes/relation_router.js';
import { BrandRouter } from './routes/brandRouter.js';
import { ReviewRouter } from './routes/reviewRouter.js';




const app = express()
app.use(express.urlencoded({ extended: true }));
app.use(MainRouter, UserRouter, ProductRouter, CategoryRouter, BrandRouter, ProductCategoryRouter, ReviewRouter, sync)


app.listen(process.env.PORT, () => {
	console.log(`Server kører på port http://localhost:${process.env.PORT}`);
})


