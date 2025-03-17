import FormulaInput from "./components/formula-input";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center p-20 gap-10">
      <section>
        {" "}
        <FormulaInput />
      </section>
    </div>
  );
}
