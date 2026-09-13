<?php

namespace App\Services\AI;

interface AIProviderInterface
{
    public function predict(array $fixtureData, array $context = []): array;
    public function getConfidence(array $factors): float;
    public function getRisk(array $factors): string;
}
