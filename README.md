<h1 align="center">Goal</h1>

<h3 align="center">Useful to create Query string with a DTO in Typescript.</h3>
<p align="center"><em>Generic solution</em></p>

```ts
const queryParams: QueryParams<MyEntity> = {
	id: 1,
	name: "R2-D2",
};
```
Into

```ts
"id=1&name=R2-D2"
```