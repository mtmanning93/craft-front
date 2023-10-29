# Craft Social

### Libraries

react bootstrap4

npm install react-router-dom@5.3.0

npm install axios

### Bugs

axios defaults base URL was original set for the frontend url not the API

## WARNINGS

### Assignments to the 'filter' variable from inside React Hook useEffect will be lost after each render. 

src/pages/Feeds.js
Line 24:15:  Assignments to the 'filter' variable from inside React Hook useEffect will be lost after each render. To preserve the value over time, store it in a useRef Hook and keep the mutable value in the '.current' property. Otherwise, you can move this variable directly inside useEffect  react-hooks/exhaustive-deps

CORRECT

    useEffect(() => {
        
        let filter = ""
        
		const getPosts = async () => {

    

INCORRECT

	useEffect(() => {

		const getPosts = async () => {
			try {
				if (currentUrl === "/feed") {
					filter = `owner__followed__owner__profile=${user_id}&`;
				} else if (currentUrl === "/liked") {
					filter = `like__owner__profile=${user_id}&ordering=-like__created_on&`;
				}

				const { data } = await axiosReq.get(`/posts/?${filter}`);
				setPosts(data);
				setLoaded(true);
			} catch (error) {
				console.error(error);
			}
		};
		setLoaded(false);
		getPosts();

	}, [filter, currentUrl]);

CORRECT




### React Hook useEffect has a missing dependency: 'handleMount'. Either include it or remove the dependency array

The warning you're seeing is a linting warning provided by the react-hooks/exhaustive-deps rule. It's suggesting that you have a missing dependency in the dependency array of the useEffect hook.

In your code, the handleMount function is defined inside the useEffect, and you're calling it directly inside the useEffect. Since it's defined within the scope of the useEffect, it doesn't need to be listed as a dependency. However, to satisfy the linting rule and make your code more explicit, you can define handleMount outside the useEffect and include it as a dependency if you use any external variables or props within the function.

CORRECT
UseEffect() dependency array warning:

  useEffect(() => {
    const handleMount = async () => {
      try {
        const [{ data: obj }] = await Promise.all([
          axiosReq.get(`/posts/${id}`),
        ]);
        setObj({ results: [obj] });
        console.log(obj);
      } catch (err) {
        console.log(err);
      }
    };

    handleMount();
  }, [id]);

INCORRECT (WARNINGS)
  const handleMount = async () => {
    try {
      const [{data: obj}] = await Promise.all([
        axiosReq.get(`/posts/${id}`),
      ])
      setObj({results: [obj]})
      console.log(obj)
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    handleMount();
  }, [id]);

### Custom user context hook

### axios interceptors and access tokens

### Infinite Scroll

[Npm react infinite scroll docs](https://www.npmjs.com/package/react-infinite-scroll-component)
[NPM react infinite scroll github repo](https://github.com/ankeetmaini/react-infinite-scroll-component)
[Implementing Infinite sroll (log rocket)](https://blog.logrocket.com/3-ways-implement-infinite-scroll-react/#call-fetchdata-component-mount)