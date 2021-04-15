import React from "react";
import FirstSection from "../../components/FirstSection";
import Header from "../../components/Header";
import SecondSection from "../../components/SecondeSection";

export default function Home() {
	return (
		<>
			<Header />
			<FirstSection />
			<SecondSection />
			<div style={{ height: "100vh" }} />
		</>
	);
}
