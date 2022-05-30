import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';
export default function Home() {
  const [value, setValue] = useState('');
  const [page, setPage] = useState(1);
  const router = useRouter();
  const clickHandler = (e) => {
    e.preventDefault();
    console.log('trigger');
    if (
      value === null ||
      value === undefined ||
      value === '' ||
      page < 1 ||
      page === null ||
      page === undefined
    )
      return;

    router.push(`/api/query/${value}?page=${page}`);
  };
  return (
    <div className="mt-20 h-[100vh]">
      <Head>
        <title>image-search</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <form
        className="flex justify-center flex-col  justify-items-center items-center "
        onSubmit={clickHandler}
      >
        <label htmlFor="fvalue">
          Search:{' '}
          <input
            autoComplete="off"
            id="fvalue"
            name="fvalue"
            placeholder="cat"
            className="border-[1.5px] border-blue-200  text-center rounded-lg invalid:border-red-300"
            type="text"
            onChange={(e) => setValue(e.target.value)}
            required
          ></input>
        </label>
        <label htmlFor="fpage">
          Page: (min:1)
          <input
            autoComplete="off"
            id="fpage"
            name="fpage"
            required
            value={page}
            min={1}
            type="number"
            className="text-center w-20 border-[1.5px] border-blue-200 rounded-lg invalid:border-red-300 m-4"
            onChange={(e) => setPage(e.target.value)}
          ></input>
        </label>{' '}
        <input
          type="submit"
          value="→"
          className="cursor-pointer border-[1.5px] border-blue-200 hover:border-blue-400 rounded-lg w-12 transition-all duration-200 ease-in-out ml-2 hover:translate-x-2"
        />
      </form>
      <div className="m-12  flex items-center justify-items-center justify-center">
        <button
          className="cursor-pointer border-[1.5px] border-blue-200 hover:border-blue-400 rounded-lg w-fit transition-all duration-200 ease-in-out ml-2 p-2"
          onClick={() => router.push('api/recent_search')}
        >
          Recent Search
        </button>
      </div>
    </div>
  );
}
