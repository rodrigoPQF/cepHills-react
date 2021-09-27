import "./button.css";

export default function Button() {
  return (
    <div class="fab">
      <button class="main" onClick={() => window.location.reload()}></button>
    </div>
  );
}
