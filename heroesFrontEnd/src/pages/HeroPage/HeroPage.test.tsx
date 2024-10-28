
import { render, renderHook, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import HeroPage from "./HeroPage";
import { getAllSourceHeroes } from "../../services/heroSourceServices";
import {
  QueryClient,
  QueryClientProvider,
  useQuery
} from "@tanstack/react-query";
import HeroCard from "../../components/HeroCard/HeroCard";
import { MemoryRouter } from "react-router-dom";

const query = {useQuery};

const queryClient = new QueryClient();
describe("HeroPage", () => {
    const mockResults = {
        "id": 51,
        "name": "A-Bomb",
        "powerstats": {
            "id": 65,
            "combat": 64,
            "durability": 80,
            "intelligence": 38,
            "power": 24,
            "speed": 17,
            "strength": 100
        },
        "images": {
            "id": 51,
            "xs": null,
            "sm": "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/sm/1-a-bomb.jpg",
            "md": null,
            "lg": null
        }
    }
  afterEach(() => {
    vi.resetAllMocks();
  });
  it("Query should be called when page is loaded", async () => {
    render(
        <MemoryRouter><QueryClientProvider client={queryClient}>
        <HeroPage />
      </QueryClientProvider></MemoryRouter>
    );
    vi.spyOn(query, 'useQuery').mockImplementation(vi.fn().mockReturnValue({
        data: undefined,
        isPending: true,
        isFetching: false,
        isError: false,
        isSuccess: false,
        error: null,
    }))
    const { result } = renderHook(() => getAllSourceHeroes());
    await waitFor(() => renderHook(() => result.current));
    await waitFor(() => screen.getByText("Loading..."));
    screen.debug();
  });
  it("should render HeroCards once query is successful", async () => {
    render(
        <MemoryRouter><QueryClientProvider client={queryClient}>
        <HeroPage />
      </QueryClientProvider></MemoryRouter>
    );
    const { result } = renderHook(() => getAllSourceHeroes());
    await waitFor(() => renderHook(() => result.current));

   vi.spyOn(query, 'useQuery').mockImplementation(vi.fn().mockReturnValue({
        data: mockResults,
        isPending: false,
        isFetching: false,
        isError: false,
        isSuccess: true,
        error: null,
    }))
    render(<MemoryRouter><QueryClientProvider client={queryClient}><HeroCard heroType={"SOURCE"} hero={mockResults}/></QueryClientProvider></MemoryRouter>)
    const heroName = screen.getByText("A-Bomb")
      expect(heroName).toBeInTheDocument;
      screen.debug()
  });
});
