import {
  fireEvent,
  getByText,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { expect, it, vi } from "vitest";
import Battler from "./Battler";
import { QueryClient, useQuery } from "@tanstack/react-query";
import { getSavedHeroById } from "../../services/saveHeroServices";
import * as saveHeroServices from "../../services/saveHeroServices";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

const query = { useQuery };
const queryClient = new QueryClient();

describe("Battler", () => {
  const mockResults = [
    {
      id: 1,
      name: "Test Man",
      powerstats: {
        id: 65,
        combat: 64,
        durability: 80,
        intelligence: 38,
        power: 24,
        speed: 17,
        strength: 100,
      },
      images: {
        id: 1,
        xs: null,
        sm: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/sm/1-a-bomb.jpg",
        md: null,
        lg: null,
      },
    },
    {
      id: 2,
      name: "Lava Boy",
      powerstats: {
        id: 66,
        combat: 64,
        durability: 80,
        intelligence: 38,
        power: 24,
        speed: 17,
        strength: 100,
      },
      images: {
        id: 2,
        xs: null,
        sm: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/sm/1-a-bomb.jpg",
        md: null,
        lg: null,
      },
    },
  ];
  const mockResults1 = {
    id: 1,
    name: "Test Man",
    powerstats: {
      id: 1,
      combat: 7,
      durability: 4,
      intelligence: 2,
      power: 5,
      speed: 5,
      strength: 6,
    },
    images: {
      id: 1,
      xs: null,
      sm: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/sm/1-a-bomb.jpg",
      md: null,
      lg: null,
    },
  };
  const mockResults2 = {
    id: 2,
    name: "Lava Boy",
    powerstats: {
      id: 2,
      combat: 3,
      durability: 3,
      intelligence: 2,
      power: 8,
      speed: 4,
      strength: 9,
    },
    images: {
      id: 2,
      xs: null,
      sm: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/sm/1-a-bomb.jpg",
      md: null,
      lg: null,
    },
  };

  afterEach(() => {
    vi.resetAllMocks();
  });
  it("Should call getSavedHeroesById twice", () => {
    const spyGetHeroes = vi.spyOn(saveHeroServices, "getSavedHeroById");
    render(<Battler heroId1={1} heroId2={2} />);
    expect(spyGetHeroes).toHaveBeenCalledTimes(2);
  });
  it("Should generate Battle cards for each hero", async () => {
    const spyGetHeroes = vi.spyOn(saveHeroServices, "getSavedHeroById");
    spyGetHeroes
      .mockResolvedValueOnce(mockResults1)
      .mockResolvedValueOnce(mockResults2);

    render(
      <MemoryRouter>
        <Battler heroId1={1} heroId2={2} />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(spyGetHeroes).toHaveBeenCalledTimes(2);
    });
    const fight = screen.getByRole("button", { name: /FIGHT/i });

    expect(fight).toBeInTheDocument();
    userEvent.click(fight);

    await waitFor(() => {
      expect(screen.getByText("Test Man")).toBeInTheDocument();
      expect(screen.getByText("Lava Boy")).toBeInTheDocument();
    });

  });
  it("Should attack when ATTACK button is clicked and battleMessage should reflect damage and win condition", async () => {
    const spyGetHeroes = vi.spyOn(saveHeroServices, "getSavedHeroById");
    spyGetHeroes
      .mockResolvedValueOnce(mockResults1)
      .mockResolvedValueOnce(mockResults2);
    render(
      <MemoryRouter>
        <Battler heroId1={1} heroId2={2} />
      </MemoryRouter>
    );
    await waitFor(() => {
      expect(spyGetHeroes).toHaveBeenCalledTimes(2);
    });
    const fight = screen.getByRole("button", { name: /FIGHT/i });
    expect(fight).toBeInTheDocument();
    userEvent.click(fight);
    await waitFor(() => {
      expect(screen.getByText("Test Man")).toBeInTheDocument();
      expect(screen.getByText("Lava Boy")).toBeInTheDocument();
    });

    const attack1 = screen.getByTestId("attack1");
    const attack2 = screen.getByTestId("attack2");

    expect(attack2).toBeDisabled();

    await waitFor(() => {
      userEvent.click(attack1);
      expect(screen.getByText("Test Man attacked Lava Boy for 7 damage!"))
        .toBeInTheDocument;
    });
    expect(attack1).toBeDisabled();

    await waitFor(() => {
      userEvent.click(attack2);
      expect(screen.getByText("Lava Boy attacked Test Man for 5 damage!"))
        .toBeInTheDocument;
    });

    expect(attack2).toBeDisabled();

    await waitFor(() => {
      userEvent.click(attack1);
      expect(screen.getByText("Test Man wins!")).toBeInTheDocument;
    });
  });
});
