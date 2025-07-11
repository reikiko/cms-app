"use client";

import React, { useState } from "react";
import AppLayout from "@/components/AppLayout";
import { Input, Button, Typography } from "antd";

const { Title, Paragraph } = Typography;

export default function LogicPage() {
  // STATE FOR NAME VALIDATOR
  const [name, setName] = useState("");
  const [nameResult, setNameResult] = useState<{
    valid: boolean;
    reason?: string;
  } | null>(null);

  // STATE FOR DISAPPEARED NUMBERS
  const [arrayInput, setArrayInput] = useState("");
  const [missingNumbers, setMissingNumbers] = useState<number[] | null>(null);

  // LOGIC 1: NAME VALIDATOR
  function validateName(name: string): { valid: boolean; reason?: string } {
    const terms = name.trim().split(" ");
    if (terms.length < 2 || terms.length > 3) {
      return {
        valid: false,
        reason: "Name must contain 2 or 3 terms.",
      };
    }

    const isInitial = (term: string) => /^[A-Z]\.$/.test(term);
    const isWord = (term: string) => /^[A-Z][a-z]+$/.test(term);

    for (const term of terms) {
      if (!(isInitial(term) || isWord(term))) {
        if (term.includes(".") && !isInitial(term)) {
          return {
            valid: false,
            reason: `"${term}" is not a valid initial (should be 1 uppercase letter followed by a dot).`,
          };
        }
        if (!term.includes(".") && !isWord(term)) {
          return {
            valid: false,
            reason: `"${term}" is not a valid word (should start with a capital letter and have no dots).`,
          };
        }
      }
    }

    const last = terms[terms.length - 1];
    if (!isWord(last)) {
      return {
        valid: false,
        reason:
          "Last name must be a word (no dots, 2+ characters, capitalized).",
      };
    }

    if (terms.length === 2) {
      const [first, second] = terms;
      if (isInitial(first) && isWord(second)) return { valid: true };
      if (isWord(first) && isWord(second)) return { valid: true };

      return {
        valid: false,
        reason: "With 2 terms, allowed formats: initial + word OR word + word.",
      };
    }

    // terms.length === 3
    const [first, middle, lastName] = terms;

    if (isInitial(first) && isWord(middle)) {
      return {
        valid: false,
        reason:
          "Cannot have: initial first + word middle. Only valid if middle is also initial or both are words.",
      };
    }

    if (!isWord(lastName)) {
      return {
        valid: false,
        reason: "Last name must always be a word.",
      };
    }

    return { valid: true };
  }

  // LOGIC 2: FIND MISSING NUMBERS
  function findDisappeared(nums: number[]): number[] {
    const set = new Set(nums);
    const result = [];
    for (let i = 1; i <= nums.length; i++) {
      if (!set.has(i)) result.push(i);
    }
    return result;
  }
  return (
    <AppLayout>
      <div className="w-full mx-auto p-4 flex flex-col gap-4 h-full overflow-y-scroll">
        <Title level={3}>Logic Test Playground</Title>

        {/* NAME VALIDATOR */}
        <div>
          <Title level={5}>1. Name Validator</Title>
          <div className="flex flex-col md:flex-row gap-4">
            <Input
              placeholder="Enter name (e.g. Ivan T. Septian)"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full max-w-md mb-2"
            />
            <Button
              type="primary"
              onClick={() => setNameResult(validateName(name))}
              className="w-full md:w-fit"
            >
              Validate Name
            </Button>
          </div>
          {nameResult !== null && (
            <Paragraph className="mt-2">
              {nameResult.valid ? (
                <span className="text-green-500">✅ Valid name</span>
              ) : (
                <span className="text-red-500">
                  ❌ Invalid name
                  <br />
                  <strong>Reason:</strong> {nameResult.reason}
                </span>
              )}
            </Paragraph>
          )}
        </div>

        {/* DISAPPEARED NUMBERS */}
        <div>
          <Title level={5}>2. Find Disappeared Numbers</Title>
          <div className="flex flex-col md:flex-row gap-4">
            <Input
              placeholder="Enter array (e.g. 4,3,2,7,8,2,3,1)"
              value={arrayInput}
              onChange={(e) => setArrayInput(e.target.value)}
              className="w-full max-w-md mb-2"
            />
            <Button
              type="primary"
              onClick={() => {
                const nums = arrayInput
                  .split(",")
                  .map((n) => parseInt(n.trim()))
                  .filter((n) => !isNaN(n));
                setMissingNumbers(findDisappeared(nums));
              }}
              className="w-full md:w-fit"
            >
              Find Missing
            </Button>
          </div>
          {missingNumbers && (
            <Paragraph className="mt-2">
              Missing Numbers:{" "}
              <strong>
                {missingNumbers.length ? missingNumbers.join(", ") : "None"}
              </strong>
            </Paragraph>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
