import React from 'react';

import Head from 'next/head';

import { HomePage } from '@todo/containers/home-page/HomePage';

export default function Home() {
  return (
    <>
      <Head>
        <title>Todo List</title>
        <meta name="description" content="Create Todo list" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <HomePage />
    </>
  );
}
