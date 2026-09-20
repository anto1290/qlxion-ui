import { describe, it, expect } from "vitest";
import React from "react";
import { render, fireEvent } from "@testing-library/react";
import axe from "axe-core";
import type { AxeResults } from "axe-core";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
} from "./alert-dialog";

describe("AlertDialog", () => {
  it("renders alert dialog content when trigger clicked", () => {
    const { getByText, queryByText } = render(
      <AlertDialog>
        <AlertDialogTrigger>Hapus</AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogTitle>Konfirmasi Hapus</AlertDialogTitle>
          <AlertDialogDescription>Tindakan ini tidak dapat dibatalkan.</AlertDialogDescription>
          <AlertDialogAction>Ya, Hapus</AlertDialogAction>
        </AlertDialogContent>
      </AlertDialog>
    );

    expect(queryByText("Konfirmasi Hapus")).not.toBeInTheDocument();
    fireEvent.click(getByText("Hapus"));
    expect(getByText("Konfirmasi Hapus")).toBeInTheDocument();
  });
});

describe("AlertDialog accessibility", () => {
  it("passes axe-core accessibility", async () => {
    const { container } = render(
      <AlertDialog>
        <AlertDialogTrigger>Hapus</AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogTitle>Konfirmasi</AlertDialogTitle>
          <AlertDialogDescription>Deskripsi</AlertDialogDescription>
          <AlertDialogAction>Ya</AlertDialogAction>
        </AlertDialogContent>
      </AlertDialog>
    );
    const results = (await axe.run(container)) as AxeResults;
    expect(results.violations).toEqual([]);
  });
});
