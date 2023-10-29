# Craft Social

### Libraries

react bootstrap4

npm install react-router-dom@5.3.0

npm install axios

### Bugs

axios defaults base URL was original set for the frontend url not the API

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