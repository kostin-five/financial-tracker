import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Header from "./Header";
import * as balanceHook from "../hooks/useBalance";

// Указываем, что мы будем имитировать этот файл
vi.mock("../hooks/useBalance");

describe("Компонент Header", () => {
  it("правильно отображает заголовок и отрендеренный баланс", () => {
    // 1. Подготавливаем данные: заставляем хук вернуть 7500
    vi.spyOn(balanceHook, "useBalance").mockReturnValue(7500);

    // 2. Рендерим компонент (виртуально рисуем его в jsdom)
    render(<Header />);

    // 3. Проверяем, что текст "Мои Финансы" появился на экране
    expect(screen.getByText("Мои Финансы")).toBeInTheDocument();

    // 4. Проверяем, что наш "поддельный" баланс 7500 успешно вывелся
    expect(screen.getByText("7500")).toBeInTheDocument();
  });
});
