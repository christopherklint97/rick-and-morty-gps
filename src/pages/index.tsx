import type { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import Table from "../components/Table";
import GET_LOCATIONS from "../gql/getLocations";
import { addApolloState, initializeApollo } from "../lib/apolloClient";
import styles from "../styles/Home.module.css";

export const getStaticProps: GetStaticProps = async () => {
  const apolloClient = initializeApollo();
  const { data } = await apolloClient.query({
    query: GET_LOCATIONS,
  });

  return addApolloState(apolloClient, {
    props: {
      data,
    },
  });
};

const Home: NextPage = ({
  data,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <main className={styles.main}>
      <Table data={data.locations.results} />
    </main>
  );
};

export default Home;
